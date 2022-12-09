
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
      
        // Move the declaration of these variables outside of the loops
        // to avoid creating new variables on each iteration
        let accessToken = userData.redditAccessToken;
        var username = userData.redditUsername;
        let upvotedCount = 0;
        let downvotedCount = 0;
        let submittedCount = 0;
      
        // Perform all requests in parallel using Promise.all()
        let [upvoted, downvoted, submitted, subreddits] = await Promise.all([
          fetch(`https://oauth.reddit.com/user/${username}/upvoted`, {
            method: 'GET',
            headers: { authorization: `Bearer ${accessToken}` }
          }),
          fetch(`https://oauth.reddit.com/user/${username}/downvoted`, {
            method: 'GET',
            headers: { authorization: `Bearer ${accessToken}` }
          }),
          fetch(`https://oauth.reddit.com/user/${username}/submitted`, {
            method: 'GET',
            headers: { authorization: `Bearer ${accessToken}` }
          }),
          fetch(`https://oauth.reddit.com/subreddits/mine/subscriber`, {
            method: 'GET',
            headers: { authorization: `Bearer ${accessToken}` }
          }),
        ]);
      
        // Use array.map() and array.filter() instead of for loops
        // to simplify the code and make it easier to read
        let upvotedData = await upvoted.json();
        upvotedCount = upvotedData["data"]["children"]
          .filter(post => post.data.author != username)
          .map(post => redditPost.addRedditPost({
            username: username,
            subreddit: post.data.subreddit,
            title: post.data.title,
            upvoted: true,
            totalUpvote: post.data.ups
          })).length;
        
        let downvotedData = await downvoted.json();
        downvotedCount = downvotedData["data"]["children"]
          .filter(post => post.data.author != username)
          .map(post => redditPost.addRedditPost({
            username: username,
            subreddit: post.data.subreddit,
            title: post.data.title,
            downvoted: true,
            totalUpvote: post.data.ups
          })).length;
      
        let submittedData = await submitted.json();
        submittedCount = submittedData["data"]["children"]
          .map(post => redditPost.addRedditPost({
            username: username,
            subreddit: post.data.subreddit,
            title: post.data.title,
            isAuthor: true,
            upvoted: true,
            totalUpvote: post.data.ups
          })).length;
      
        let subredditData = await subreddits.json();
        let userSubs = subredditData["data"]["children"]
        .map(post => ({ title: post.data.title, description: post.data.description }));
      
        // Use destructuring assignment to simplify the query object
        var { username, subreddit } = { username, subreddit: userSubs };
        redditSub.updateIfExist({ username, subreddit });
      
        return res.send(`Added posts for user with id ${userId}
                        - Upvoted posts: ${upvotedCount}
                        - Downvoted posts: ${downvotedCount}
                        - Submitted posts: ${submittedCount}
                        - User's subreddits updated`);
      } catch (err) {
        return res.json({
          message: "Erreur à la récuperation des données utilisateur",
        });
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