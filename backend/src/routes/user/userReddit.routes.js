
const Auth = require('../../shared/auth/auth.service');
const User = require('../../mongoose/user');
const redditPost = require('../../mongoose/redditPost');
const redditSub = require('../../mongoose/redditSub');
const { response } = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const userRedditRouter = require('express').Router()

require('dotenv').config();


//// Fetch route for reddit API. This route get all posts from :userId, his subreddits and add them to our database.
//// Return : String, with information on added posts.
userRedditRouter.post('/fetch/:userId', async (req, res) => {
    try {
            var userId = req.params.userId;
            var userData = await User.getUserById(userId);
            if (!userData.redditUsername || !userData.redditAccessToken) {
                return res.json({
                    message: "Erreur à la récuperation de l'utilisateur",
                });
            }
            var accessToken = userData.redditAccessToken;
            var username = userData.redditUsername;
            var responseData = await fetch(`https://oauth.reddit.com/user/${username}/upvoted`, {
                method: 'GET',
                headers: {authorization: `Bearer ${accessToken}`}
            })
            var upvoted = await responseData.json();
            var upvotedCount = 0;
            for(let post of upvoted["data"]["children"]) {
                let checkIfExist = await redditPost.checkIfExist(post.data.title, post.data.subreddit);
                if(post.data.author != username && !checkIfExist) {
                    upvotedCount ++;
                    redditPost.addRedditPost({
                        username: username,
                        subreddit: post.data.subreddit,
                        title: post.data.title,
                        upvoted: true,
                        totalUpvote: post.data.ups
                    });
                }
            }
            responseData = await fetch(`https://oauth.reddit.com/user/${username}/downvoted`, {
                method: 'GET',
                headers: {authorization: `Bearer ${accessToken}`}
            })
            var downvoted = await responseData.json();
            var downvotedCount = 0;
            for(let post of downvoted["data"]["children"]) {
                let checkIfExist = await redditPost.checkIfExist(post.data.title, post.data.subreddit);
                if(post.data.author != username && !checkIfExist) {
                    downvotedCount ++;
                    redditPost.addRedditPost({
                        username: username,
                        subreddit: post.data.subreddit,
                        title: post.data.title,
                        downvoted: true,
                        totalUpvote: post.data.ups
                    });
                }
            }
            responseData = await fetch(`https://oauth.reddit.com/user/${username}/submitted`, {
                method: 'GET',
                headers: {authorization: `Bearer ${accessToken}`}
            })
            var submitted = await responseData.json();
            var submittedCount = 0;
            for(let post of submitted["data"]["children"]) {
                let checkIfExist = await redditPost.checkIfExist(post.data.title, post.data.subreddit);
                if(!checkIfExist) {
                    submittedCount ++;
                    redditPost.addRedditPost({
                        username: username,
                        subreddit: post.data.subreddit,
                        title: post.data.title,
                        isAuthor: true,
                        upvoted: true,
                        totalUpvote: post.data.ups
                    });
                }
            }
            responseData = await fetch(`https://oauth.reddit.com/subreddits/mine/subscriber`, {
                method: 'GET',
                headers: {authorization: `Bearer ${accessToken}`}
            })
            var subreddits = await responseData.json();
            var userSubs = [];
            for(let post of subreddits["data"]["children"]) {
                userSubs.push({ title: post.data.title, description: post.data.description });
            }

            let query = {
                username: username,
                subreddit: userSubs
            };
            redditSub.updateIfExist(query);

            return res.send(`Added posts for user with id ${userId}
                            - Upvoted posts: ${upvotedCount}
                            - Downvoted posts: ${downvotedCount}
                            - Submitted posts: ${submittedCount}
                            - User's subreddits updated`);

    } 
    catch(err) {
        console.log('ERROR reddit FetchUserReddit => ', err);
        return res.send(err);
    }
})


//// Get posts from :userId.
//// Query parameter : filter. Accepted values : all, upvoted, downvoted, posted.
userRedditRouter.get('/posts/:userId', async (req, res) => {
    try {
        var userId = req.params.userId;
        var filter = req.query.filter;
        var userData = await User.getUserById(userId);
        if (!userData.redditUsername || !userData.redditAccessToken) {
            return res.json({
                message: "Erreur à la récuperation de l'utilisateur",
            });
        }
        accessToken = userData.redditAccessToken;
        username = userData.redditUsername;
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
        console.log('ERROR reddit getUserPosts => ', err);
        return res.send(err);
    }
})

//// Get subs from :userId
userRedditRouter.get('/subs/:userId', async (req, res) => {
    try {
        var userId = req.params.userId;
        var userData = await User.getUserById(userId);
        if (!userData.redditUsername || !userData.redditAccessToken) {
            return res.json({
                message: "Erreur à la récuperation de l'utilisateur",
            });
        }
        username = userData.redditUsername;
        subs = await redditSub.getSubsByUsername(username);
        return res.status(200).json({
            "userRedditSubs": subs,
        });
    }
    catch(err) {
        console.log('ERROR reddit getUserSubs => ', err);
        return res.send(err);
    }
})



module.exports = userRedditRouter