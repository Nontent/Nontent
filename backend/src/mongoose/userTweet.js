const db = require('./db');
const Mongoose = require('mongoose');

const userTweetCollectionName = "userTweets"

const userTweetSchema = new Mongoose.Schema({
    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    tweetId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'twitterPosts'
    },
    from: String
});

try {
    userTweets = Mongoose.model(userTweetCollectionName, userTweetSchema);
} catch (error) {
    console.log(error);
}

const getUserTweet = async (tweetId, userId) => {
    try {
        await db.connect();
        return await userTweets.findOne({
            tweetId: tweetId,
            userId: userId
        }).exec();
    } catch (error) {
        throw new Error(error);
    }
}

exports.getUserTweetById = async (tweetId) => {
    try {
        await db.connect();
        return await userTweets.findById(tweetId).exec();
    } catch (error) {
        throw new Error(error);
    }
}

exports.getUserTweetsByUserId = async (userId) => {
    try {
        data = []
        await db.connect();
        tweets = await userTweets.find({
            userId: userId
        }).populate(["tweetId", "userId"]).exec();
        tweets.forEach(tweet => {
            data.push(tweet.tweetId["text"])
        });
        return data
    } catch (error) {
        throw new Error(error);
    }
}

exports.addUserTweet = async (userTweet) => {
    try {
        await db.connect();
        const post = await getUserTweet(userTweet.tweetId, userTweet.userId)
        if (!post) {
            const createdUserPost = await userTweets.create(userTweet);
            return createdUserPost._id;
        } else {
            return post._id;
        }
    } catch (error) {
        throw new Error(error);
    }
}
