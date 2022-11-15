
////TODO(@BLANC Nicolas): Move secretskeys in .env file 
const REDDIT_CLIENT_ID = "TN6bnT8p1cfnwH7hkZTZuw";
const REDDIT_CLIENT_SECRET = "ymZ7IBmNSn67SVb5ZDKhgZNXXUBfYA";
const Auth = require('../../shared/auth/auth.service');
const User = require('../../mongoose/user');
const redditPost = require('../../mongoose/redditPost');
const UserService = require('../user/user.service')
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const userRedditRouter = require('express').Router()

require('dotenv').config();


//// Return refresh_token, access_token and expiration date + update current user.
userRedditRouter.post('/fetch/:userId', async (req, res) => {
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
                checkIfExist = await redditPost.checkIfExist(post.data.title, post.data.subreddit);
                if(post.data.author != username && !checkIfExist) {
                    upvotedCount ++;
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
                checkIfExist = await redditPost.checkIfExist(post.data.title, post.data.subreddit);
                if(post.data.author != username && !checkIfExist) {
                    downvotedCount ++;
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
                checkIfExist = await redditPost.checkIfExist(post.data.title, post.data.subreddit);
                if(!checkIfExist) {
                    submittedCount ++;
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

userRedditRouter.get('/posts/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const filter = req.query.filter;
        const user = await User.getUserById(userId);
        if (!user.redditUsername || !user.redditAccessToken) {
            return res.json({
                message: "Erreur à la récuperation de l'utilisateur",
            });
        }
        accessToken = user.redditAccessToken;
        username = user.redditUsername;
        switch (filter) {
            case 'all':
                posts = await redditPost.getRedditPostsByUsername(username);
                break;
            case 'upvoted':
                posts = await redditPost.getRedditPostsWithFilter({ upvoted: true, isAuthor: false })
                break;
            case 'downvoted':
                posts = await redditPost.getRedditPostsWithFilter({ downvoted: true })
                break;
            case 'posted':
                posts = await redditPost.getRedditPostsWithFilter({ isAuthor: true })
                break;
            default: 
                return res.send('Unrecognized filter');
        }
        return res.status(200).json({
            "userRedditPosts": posts,
        });
    }
    catch(err) {
        console.log('ERROR reddit OAuth => ', err);
        return res.send(err);
    }
})

module.exports = userRedditRouter