const User = require('../../mongoose/user');

const {
    TwitterApi
} = require('twitter-api-v2')

exports.getClient = async (token) => {
    try{
        const client = new TwitterApi(token);
        return client
    }catch(error){
        console.log('invalid token => ', e);
    }
    throw new Error();
}