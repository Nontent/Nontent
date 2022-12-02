const UserMongoose = require('../../mongoose/user');
const AuthService = require('../../shared/auth/auth.service');
const md5 = require('md5');

exports.isSigninRequestValid = (signinRequest) => {
    if (!signinRequest.email || !signinRequest.password) {
        // TODO: Error to implement.
        throw new Error();
    }
    return signinRequest;
}

exports.verifyConnectionAuthorization = async (request) => {
    try{
        const userFromDB = await UserMongoose.getUserByEmail(request.email.toLowerCase());
        console.log('USER FROM DB: ', userFromDB)
        // TODO: Error to implement.
        if (!userFromDB) throw new Error();
        if (userFromDB.password !== md5(request.password)) throw new Error();
    
        return generateSigninResponse(userFromDB);
    }catch(error){
        console.log('ERROR in verifyConnectionAuthorization => ', error);
    }
    throw new Error();
}

function generateSigninResponse(user) {
    return {
        token: AuthService.signToken({
            userId: user._id,
            birthDate: user.birthDate,
            roles: [],
            socialNetworks: user.socialNetworks ?? []
        }),
        userId: user._id,
        redditTokenDate: user.redditTokenDate
    }
}
