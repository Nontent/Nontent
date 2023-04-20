const User = require('../../mongoose/user');
const UserTweet = require('../../mongoose/userTweet')
const md5  = require('md5');

exports.getUserHandler = async (userId) => {
    const userToFetch = await User.getUserById(userId);
    if (!userToFetch) throw new Error();

    return userToFetch
}

exports.isUserCreationRequestCorrect = (request) => {
    if (!request.email || !request.password) {
        // TODO: Error to implement.
        throw new Error();
    }
    return request;
}

exports.userCreationService = async (userBody) => {
    if (userBody.password) {
        userBody.password = md5(userBody.password)
    }
    var user = await User.getUserByEmail(userBody.email);
    if(!user) {
        const userId = await User.addUser(userBody);
        return { userId: userId }
    }
    else {
        throw new Error('Authentication error');
    }
}

exports.userUpdateService = async (userId, userBody) => {
    console.log('props', userId, userBody)
    if (!userId || !userBody) {
        throw new Error('Props invalid');
    }
    return User.updateUser(userId, userBody);
}

exports.userDeleteService = async (userId) => {
    if(!userId) {
        throw new Error();
    }
    return User.deleteUser(userId);
}

exports.getUserByCodeTwitter = async(code)=>{
    if(!code){
        throw new Error('Please provide code');
    }
    return User.getUserByCode(code);
}

exports.getUserTweets = async(userId) => {
    if(!userId){
        throw new Error('provide userId');
    }
    return UserTweet.getUserTweetsByUserId(userId)
}