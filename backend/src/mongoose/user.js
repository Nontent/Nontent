const db = require('./db');
const Mongoose = require('mongoose');

const collectionName = "users";

const CollectionSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: String,
    imgUrl: String,
    socialNetworks: [String],
    creationDate: {
        type: Date,
        default: Date.now()
    },
    accountDeleted: {
        type: Boolean,
        default: false
    },
    twitterCodeVerifier: {
        type: String,
        default: null
    },
    twitterSessionState: {
        type: String,
        default: null
    },
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    twitterAccessToken: {
        type: String,
        default: null
    },
    twitterRefreshToken: {
        type: String,
        default: null
    },
    twitterId: {
        type: Number,
        default: null
    },
    twitterUsername: {
=======
>>>>>>> Stashed changes
    redditAccessToken: {
        type: String,
        default: null
    },
    redditTokenDate: {
        type: String,
        default: null
    },
    redditRefreshToken: {
        type: String,
        default: null
    },
    redditUsername: {
<<<<<<< Updated upstream
=======
>>>>>>> 8c00d0c514072ad412e88f3ca96eef2763e7890b
>>>>>>> Stashed changes
        type: String,
        default: null
    }
});

let Users;
try {
    Users = Mongoose.model(collectionName);
} catch (error) {
    Users = Mongoose.model(collectionName, CollectionSchema);
}

exports.getUserByEmail = async (email) => {
    try {
        await db.connect();
        return await Users.findOne({
            email: email
        }).exec();
    } catch (error) {
        console.log('ERROR IN getUserByEmail FUNCTION => ', error);
    }
    throw new Error();
}

exports.getUserById = async (userId) => {
    try {
        await db.connect();
        return await Users.findById(userId).exec();
    } catch (error) {
        console.log('ERROR IN getUserById FUNCTION => ', error);
    }
    throw new Error();
}

exports.getUsers = async (filter) => {
    try {
        await db.connect();
        return await Users.find(filter).exec();
    } catch (error) {
        console.log('ERROR IN getUsers FUNCTION => ', error);
    }
    throw new Error();
}

exports.addUser = async (user) => {
    try {
        await db.connect();
        const createdUser = await Users.create(user);
        return createdUser._id;
    } catch (error) {
        console.log('ERROR IN addUser FUNCTION => ', error);
    }
    throw new Error();
}

exports.updateUser = async (userId, update) => {
    try {
        await db.connect();
        test = await Users.findByIdAndUpdate(userId, update, {
            new: true
        });
        console.log("username:" + test.redditUsername + "suite:" + test.redditAccessToken); 
        return await Users.findByIdAndUpdate(userId, update, {
            new: true
        });
    } catch (error) {
        console.log('ERROR IN updateUser FUNCTION => ', error);
    }
    throw new Error();
}

exports.getUserByState = async (state) => {
    try {
        console.log('code')
        await db.connect();
        return await Users.findOne({
            twitterSessionState: state
        }).exec();
    } catch (error) {
        console.error('ERROR IN getUserByState FUNCTION => ', error);
    }
    throw new Error();
}

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
     } catch (error) {
         console.log('ERROR IN functionName FUNCTION => ', error);
     }
}*/

=======
>>>>>>> Stashed changes
exports.deleteUser = async (userId) => {
    try {
        await db.connect();
        return await Users.findByIdAndRemove(userId);
    }
    catch (error) {
        console.log('ERROR IN deleteUser FUNCTION => ', error);
    }
<<<<<<< Updated upstream
}
=======
}
>>>>>>> 8c00d0c514072ad412e88f3ca96eef2763e7890b
>>>>>>> Stashed changes
