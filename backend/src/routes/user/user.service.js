const User = require('../../mongoose/user');
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
    // const userToCreate = {
    //     email: userBody.email,
    //     password: md5(userBody.password)
    // }
    const userId = await User.addUser(userBody);
    return { userId: userId }
}

exports.userUpdateService = async (userId, userBody) => {
    console.log('props', userId, userBody)
    if (!userId || !userBody) {
        throw new Error('Props invalid');
    }
    return await User.updateUser(userId, userBody)
}

exports.getUserByCodeTwitter = async(code)=>{
    if(!code){
        throw new Error('Please provide code');
    }
    return await User.getUserByCode(code)
}