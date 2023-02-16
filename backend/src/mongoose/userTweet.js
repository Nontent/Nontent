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

const getUserTweetByTweetId = async (tweetId, from, userId) => {
    try {
        await db.connect();
        return await userTweets.findOne({
            tweetId: tweetId,
            from: from,
            userId: userId
        }).exec();
    } catch (error) {
        throw new Error(error);
    }
}

exports.addUserTweet = async (tweet) => {
    try {
        await db.connect();
        const post = await getUserTweetByTweetId(tweet.tweet_id, tweet.from, tweet.user_id)
        if (!post) {
            const createdUserPost = await userTweets.create(tweetId);
            return createdUserPost._id;
        } else {
            return post._id;
        }
    } catch (error) {
        throw new Error(error);
    }
}
