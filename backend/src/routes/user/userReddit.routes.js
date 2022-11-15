
////TODO(@BLANC Nicolas): Move secretskeys in .env file 
const REDDIT_CLIENT_ID = "TN6bnT8p1cfnwH7hkZTZuw";
const REDDIT_CLIENT_SECRET = "ymZ7IBmNSn67SVb5ZDKhgZNXXUBfYA";
const Auth = require('../../shared/auth/auth.service');
const User = require('../../mongoose/user');
const redditPost = require('../../mongoose/redditPost');
const UserService = require('../user/user.service')
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const redditRouter = require('express').Router()

require('dotenv').config();


//// Return refresh_token, access_token and expiration date + update current user.
redditRouter.post('/fetch/:userId', async (req, res) => {
    try {
            // const user = await Auth.authenticationService(req);
            // if (!user) return res.status(403).json({
            //     message: "Unauthorized",
            //     status: 403
            // });
            const userId = req.params.userId;
            const user = await User.getUserById(userId);
            if (!user.redditUsername || !user.redditAccessToken) {
                return res.json({
                    message: "Erreur à la récuperation de l'utilisateur",
                });
            }
            accessToken = user.redditAccessToken;
            username = user.redditUsername;
            response = await fetch(`https://oauth.reddit.com/user/${username}/upvoted`, {
                method: 'GET',
                headers: {authorization: `Bearer ${accessToken}`}
            })
            upvoted = await response.json();
            upvotedCount = 0;
            for(var post of upvoted["data"]["children"]) {
                upvotedCount ++;
                checkIfExist = await redditPost.checkIfExist(post.data.title, post.data.subreddit);
                if(post.data.author != username && !checkIfExist) {
                    redditPost.addRedditPost({
                        username: username,
                        subreddit: post.data.subreddit,
                        title: post.data.title,
                        upvoted: true,
                        totalUpvotes: post.data.ups
                    });
                }
            }
            response = await fetch(`https://oauth.reddit.com/user/${username}/downvoted`, {
                method: 'GET',
                headers: {authorization: `Bearer ${accessToken}`}
            })
            downvoted = await response.json();
            downvotedCount = 0;
            for(var post of downvoted["data"]["children"]) {
                downvotedCount ++;
                checkIfExist = await redditPost.checkIfExist(post.data.title, post.data.subreddit);
                if(post.data.author != username && !checkIfExist) {
                    redditPost.addRedditPost({
                        username: username,
                        subreddit: post.data.subreddit,
                        title: post.data.title,
                        downvoted: true,
                        totalUpvotes: post.data.ups
                    });
                }
            }
            response = await fetch(`https://oauth.reddit.com/user/${username}/submitted`, {
                method: 'GET',
                headers: {authorization: `Bearer ${accessToken}`}
            })
            submitted = await response.json();
            submittedCount = 0;
            for(var post of submitted["data"]["children"]) {
                submittedCount ++;
                checkIfExist = await redditPost.checkIfExist(post.data.title, post.data.subreddit);
                if(post.data.author != username && !checkIfExist) {
                    redditPost.addRedditPost({
                        username: username,
                        subreddit: post.data.subreddit,
                        title: post.data.title,
                        isAuthor: true,
                        upvoted: true,
                        totalUpvotes: post.data.ups
                    });
                }
            }

            return res.send(`Added posts for user with id ${userId}
                            - Upvoted posts: ${upvotedCount}
                            - Downvoted posts: ${downvotedCount}
                            - Submitted posts: ${submittedCount}`);

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
            redditTokenExpiration: Date.now(),
        }
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
    catch(e) {
        console.log('ERROR reddit OAuth => ', err);
        return res.send(err);
    }
})

module.exports = redditRouter