const db = require('./db');
const Mongoose = require('mongoose');

var collectionName = "redditSubs";
var subredditSchema = new Mongoose.Schema({
    title: String,
    description: String,
});

const CollectionSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    subreddit: {
        type: [subredditSchema]
    }
});

let redditSubs;
try {
    redditSubs = Mongoose.model(collectionName);
} catch (error) {
    redditSubs = Mongoose.model(collectionName, CollectionSchema);
}

exports.addRedditSub = async (redditSub) => {
    try {
        await db.connect();
        createdSub = await redditSubs.create(redditSub);
        return createdSub._id;
    } catch (error) {
        console.log('ERROR IN addRedditSub FUNCTION => ', error);
    }
    throw new Error();
}

exports.updateRedditSub = async (redditSubId, update) => {
    try {
        await db.connect();
        return await redditSubs.findByIdAndUpdate(redditSubId, update, {
            new: true
        });
    } catch (error) {
        console.log('ERROR IN updateRedditSub FUNCTION => ', error);
    }
    throw new Error();
}

exports.getSubsByUsername = async (username) => {
    try {
        await db.connect();
        return await redditSubs.find({
            username: username
        }).exec();
    } catch (error) {
        console.log('ERROR IN getSubsByUsername FUNCTION => ', error);
    }
    throw new Error();
}

exports.updateIfExist = async (query) => {
    try {
        await db.connect();
        update = { expire: new Date() },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        return await redditSubs.findOneAndUpdate({ "username" : query.username }, { $set : {"subreddit" : query.subreddit }}, options);
    } catch (error) {
        console.log('ERROR IN updateIfExist FUNCTION => ', error);
    }
    throw new Error();
}