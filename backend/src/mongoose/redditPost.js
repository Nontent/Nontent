const db = require('./db');
const Mongoose = require('mongoose');

const collectionName = "redditPosts";

const CollectionSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    subreddit: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    isAuthor: {
        type: Boolean,
        default: false
    },
    upvoted: {
        type: Boolean,
        default: false
    },
    downvoted: {
        type: Boolean,
        default: false
    },
    totalUpvotes: {
        type: Number,
        default: null
    }
});

let redditPosts;
try {
    redditPosts = Mongoose.model(collectionName);
} catch (error) {
    redditPosts = Mongoose.model(collectionName, CollectionSchema);
}

exports.addRedditPost = async (redditPost) => {
    try {
        await db.connect();
        const createdPost = await redditPosts.create(redditPost);
        return createdPost._id;
    } catch (error) {
        console.log('ERROR IN addRedditPost FUNCTION => ', error);
    }
    throw new Error();
}

exports.updateRedditPost = async (redditPostId, update) => {
    try {
        await db.connect();
        return await redditPosts.findByIdAndUpdate(redditPostId, update, {
            new: true
        });
    } catch (error) {
        console.log('ERROR IN updateRedditPost FUNCTION => ', error);
    }
    throw new Error();
}

exports.getRedditPostsByUsername = async (username) => {
    try {
        await db.connect();
        return await redditPosts.find({
            username: username
        }).exec();
    } catch (error) {
        console.log('ERROR IN getRedditPostsByUsername FUNCTION => ', error);
    }
    throw new Error();
}

exports.checkIfExist = async (title, subreddit) => {
    try {
        await db.connect();
        let postCount = await Mongoose.model('redditPosts').countDocuments({title: title, subreddit: subreddit});
        if(postCount == 0)
            return false;
        else
            return true
    } catch (error) {
        console.log('ERROR IN checkIfExist, redditPost FUNCTION => ', error);
    }
}