const db = require('./db');
const Mongoose = require('mongoose');

const collectionName = "twitterPosts";

const CollectionSchema = new Mongoose.Schema({
    accountName: {
        type: String,
        required: true
    },
    content: {
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

exports.addTwitterPosts = async (twitterPost) => {
    try {
        await db.connect();
        const createdTwitterPosts = await TwitterPosts.create(twitterPost);
        return createdTwitterPosts._id;
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

