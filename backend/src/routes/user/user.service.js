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
    const userToCreate = {
        email: userBody.email,
        password: md5(userBody.password)
    }
    const userId = await User.addUser(userToCreate);
    return { userId: userId }
}
