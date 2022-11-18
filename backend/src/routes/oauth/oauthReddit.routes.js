
////TODO(@BLANC Nicolas): Move secretskeys in .env file 
const REDDIT_CLIENT_ID = "TN6bnT8p1cfnwH7hkZTZuw";
const REDDIT_CLIENT_SECRET = "ymZ7IBmNSn67SVb5ZDKhgZNXXUBfYA";
const Auth = require('../../shared/auth/auth.service');
const UserService = require('../user/user.service')
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const redditRouter = require('express').Router()

require('dotenv').config();

//// Oauth Route to get refresh_token and access_token
//// Return refresh_token, access_token and expiration date + update current user.
redditRouter.get('/', async (req, res) => {
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        });
        let code = req.query.code;
        let encodedHeader = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString("base64");
        let response = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000`,
            headers: {authorization: `Basic ${encodedHeader}`, 'Content-Type': 'application/x-www-form-urlencoded'}
        })
        let accessToken = await response.json();
        // Retrieving username, needed for later uses
        let userResponse = await fetch('https://oauth.reddit.com/api/v1/me', {
            method: 'GET',
            headers: {authorization: `Bearer ${accessToken.access_token}`} 
        })
        let userData = await userResponse.json();
        const options = {
            redditAccessToken: accessToken.access_token,
            redditTokenDate: Date.now(),
            redditRefreshToken: accessToken.refresh_token,
            redditUsername: userData.name
        };
        const updatedUser = await UserService.userUpdateService(user._id, options);
        if (!updatedUser) {
            res.status(401).json({
                message: 'User not updated'
            })
        }
        return res.status(200).json({
            "tokenInfo": accessToken,
        });
        } 
    catch(err) {
        console.log('ERROR reddit OAuth => ', err);
        return res.send(err);
    }
})

//// Refresh access_token route, updating user with a new access_token
redditRouter.get('/refresh', async (req, res) => {
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        });
        let refreshToken = user.redditRefreshToken;
        let encodedHeader = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString("base64");
        let response = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            body: `grant_type=refresh_token&refresh_token=${refreshToken}&redirect_uri=http://localhost:3000`,
            headers: {authorization: `Basic ${encodedHeader}`, 'Content-Type': 'application/x-www-form-urlencoded'}
        })
        let accessToken = await response.json();
        res.header("Access-Control-Allow-Origin", "*");
        const options = {
            redditAccessToken: accessToken.access_token,
            redditTokenDate: Date.now(),
        };
        const updatedUser = await UserService.userUpdateService(user._id, options)
        if (!updatedUser) {
            res.status(401).json({
                message: 'User not updated'
            })
        }
        return res.status(200).json({
            "accessToken": accessToken,
        });
        } 
    catch(err) {
        console.log('ERROR reddit OAuth => ', err);
        return res.send(err);
    }
})

module.exports = redditRouter