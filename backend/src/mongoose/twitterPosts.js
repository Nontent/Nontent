const db = require('./db');
const Mongoose = require('mongoose');

const collectionName = "twitterPosts";

const CollectionSchema = new Mongoose.Schema({
    tokenNontent: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        default: ''
    },
    authorId: {
        type: String,
        default: ''
    },
    tweetId: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
    nbComments: {
        type: Number,
        default: 0
    },
    nbLikes: {
        type: Number,
        default: 0
    },
    nbRetweets: {
        type: Number,
        default: 0
    },
    contextAnnotations: {
        type: Array,
        default: []
    }
});

let TwitterPosts;
try {
    TwitterPosts = Mongoose.model(collectionName);
} catch (error) {
    TwitterPosts = Mongoose.model(collectionName, CollectionSchema);
}

exports.getTwitterPosts = async (filter) => {
    try {
        await db.connect();
        return await TwitterPosts.find(filter).exec();
    } catch (error) {
        console.log('ERROR IN getTwitterPosts FUNCTION => ', error);
    }
    throw new Error();
}

const getTwitterPostsByTweetId = async (tweetId) => {
    try {
        await db.connect();
        return await TwitterPosts.findOne({
            tweet_id: tweetId
        }).exec();
    } catch (error) {
        throw new Error(error);
    }
}

exports.addTwitterPosts = async (twitterPost) => {
    try {
        await db.connect();
        const post = await getTwitterPostsByTweetId(twitterPost.tweetId)
        if (!post) {
            const createdTwitterPosts = await TwitterPosts.create(twitterPost);
            return createdTwitterPosts._id;
        } else {
            return post._id;
        }
    } catch (error) {
        console.log('ERROR IN addTwitterPosts FUNCTION => ', error);
    }
    throw new Error();
}

exports.updateTwitterPosts = async (TwitterPostsId, update) => {
    try {
        await db.connect();
        return await TwitterPosts.findByIdAndUpdate(TwitterPostsId, update, {
            new: true
        });
    } catch (error) {
        console.log('ERROR IN updateTwitterPosts FUNCTION => ', error);
    }
    throw new Error();
}

