const pkg = require('jsonwebtoken')
const {sign, verify} = pkg;
const User = require('../../mongoose/user');

const SECRET = "nontent.SECRET.";

exports.signToken = (payload) => {
    return sign(payload, SECRET, {expiresIn: '200d'});
}

const verifyToken = (token) => {
    return verify(token, SECRET);
}

exports.authenticationService = async (request) => {
    // TODO: Implement errors
    if (!request.headers || !request.headers.authorization) throw new Error("Unauthorized");

    const bearer = request.headers.authorization;
    const userToken = verifyToken(bearer.replace('Bearer ', ''));
    // TODO: Implement errors
    if (!userToken.userId) throw new Error();
    const userFromBDD = await User.getUserById(userToken.userId)
        
    if(!userFromBDD) 
        throw new Error("Unauthorized");
    else
   // TODO: Implementation de la vérification du userId
        return  userFromBDD;
}
