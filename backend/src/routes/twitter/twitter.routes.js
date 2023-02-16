const Auth = require('../../shared/auth/auth.service');
const twitterService = require('./twitter.service');
const {
    TwitterApi,
} = require('twitter-api-v2')

require('dotenv').config();

const twitterRouter = require('express').Router()

twitterRouter.post('/fetch', async (req, res) => {
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        })
        if (!user.twitterAccessToken) {
            return res.status(405).json({
                message: "No access token provided"
            })
        } else {
            const client = new TwitterApi(user.twitterAccessToken);
            const userLikedTweets = await client.v2.userLikedTweets(user.twitterId);
            const homeTimeline = await client.v2.homeTimeline({ exclude: 'replies' });
            const userTimeline = await client.v2.userTimeline(user.twitterId);

            const userLikedTweetsData = userLikedTweets.data.data
            const homeTimelineData = homeTimeline.data.data
            const userTimelineData = userTimeline.data.data

            await twitterService.addTweet(userLikedTweetsData, client, user.id, "user_like");
            await twitterService.addTweet(homeTimelineData, client, user.id, "user_home");
            await twitterService.addTweet(userTimelineData, client, user.id, "user_timeline");

            return res.status(200).json({
                message: "success"
            })
        }
    } catch (e) {
        console.log(e)
       return res.send(e)
    }
})

twitterRouter.get('/tweet/user/:id', async (req, res) => {
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        })
        if (!user.twitterAccessToken) {
            return res.status(405).json({
                message: "No access token provided"
            })
        } else {    
            let userTweet = []
            if (req.query.from) {
                userTweet = await twitterService.getTweetByUserId(req.params.id, req.query.from)
            } else {
                userTweet = await twitterService.getTweetByUserId(req.params.id)
            }
            return res.status(200).json({
                data: userTweet
            })
        }
    } catch (e) {
        console.log(e)
        return res.json({
            message: e
        })
    }
})


twitterRouter.get('/user', async (req, res) => {
    /**
     *Get a single user by ID.
     *
     *Method: .user()
     *
     *Endpoint: users/:id
     *
     *Right level: Read-only
     *
     *@param {string} userId
     *@param {UsersV2Params} options?
     *@returns {UserV2Result}
     */
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        })
        if (!user.twitterAccessToken) {
            return res.status(405).json({
                message: "No access token provided"
            })
        } else {
            const client = new TwitterApi(user.twitterAccessToken);
            const meUser = await client.v2.user(user.twitterId, {"user.fields":["public_metrics", "created_at", "description", "entities", "id", "location"]});
            data = meUser.data
            return res.status(200).json({
                data
            })
        }
    } catch (e) {
        return res.json({
            message: e
        })
    }
})


twitterRouter.get('/user/timeline', async (req, res) => {
    /**
     *Get tweets of user userId.
     *
     *Method: .userTimeline()
     *
     *Endpoint: users/:id/tweets
     *
     *Right level: Read-only
     *
     *@param {string} userId
     *@param {TweetV2UserTimelineParams} options?
     *@returns {TweetUserTimelineV2Paginator} 
     */
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        })
        if (!req.query.limit) return res.status(404).json({
            message: "No limit provided.",
        })
        if (!user.twitterAccessToken) {
            return res.status(405).json({
                message: "No access token provided"
            })
        } else {
            const client = new TwitterApi(user.twitterAccessToken);
            const tweets = await client.v2.userTimeline(user.twitterId);
            let data = []
            for await (const tweet of tweets) {
                data.push(tweet)
                const availableMeta = tweets.meta;
                const availableIncludes = tweets.includes;
                if (data.length == req.query.limit){
                    break;
                }
            }
            return res.status(200).json({
                data
            })
        }
    } catch (e) {
        return res.json({
            message: e
        })
    }
})


twitterRouter.get('/user/home', async (req, res) => {
    /**
     *Get reverse chronological tweet timeline of logged user.
     *
     *Method: .homeTimeline()
     *
     *Endpoint: users/:id/timelines/reverse_chronological
     *
     *Right level: Read-only
     *
     *@param {TweetV2HomeTimelineParams} options?
     *@returns {TweetHomeTimelineV2Paginator} 
     */
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        })
        if (!user.twitterAccessToken) {
            return res.status(405).json({
                message: "No access token provided"
            })
        } else {
            const client = new TwitterApi(user.twitterAccessToken);
            const timeLine = await client.v2.homeTimeline({ exclude: 'replies' });
            data = timeLine.data.data
            return res.status(200).json({
                data
            })
        }
    } catch (e) {
        return res.json({
            message: e
        })
    }
})


twitterRouter.get('/user/mention', async (req, res) => {
    /**
     *Get mentions of user userId.
     *
     *Method: .userMentionTimeline()
     *
     *Endpoint: users/:id/mentions
     *
     *Right level: Read-only
     *
     *@param {string} userId
     *@param {TweetV2UserTimelineParams} options?
     *@returns {TweetUserMentionTimelineV2Paginator} 
     */
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        })
        if (!user.twitterAccessToken) {
            return res.status(405).json({
                message: "No access token provided"
            })
        } else {
            const client = new TwitterApi(user.twitterAccessToken);
            const timeLine = await client.v2.userMentionTimeline(user.twitterId);
            data = timeLine.data.data
            return res.status(200).json({
                data
            })
        }
    } catch (e) {
        return res.json({
            message: e
        })
    }
})


twitterRouter.get('/tweet', async (req, res) => {
     /**
     *Get tweet by his ID.
     *
     *Method: .singleTweet()
     *
     *Endpoint: users/:id/tweets
     *
     *Right level: Read-only
     *
     *@param {string} userId
     *@param {TweetV2UserTimelineParams} options?
     *@returns {TweetUserTimelineV2Paginator} 
     */
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        })
        if (!req.query.id) return res.status(404).json({
            message: "No id provided.",
        })
        if (!user.twitterAccessToken) {
            return res.status(405).json({
                message: "No access token provided"
            })
        } else {
            const client = new TwitterApi(user.twitterAccessToken);
            const tweet = await client.v2.singleTweet(req.query.id, {
                // expansions: [
                //     'entities.mentions.username',
                //     'in_reply_to_user_id',
                //     'referenced_tweets.id',
                //     'author_id'
                // ],
                "tweet.fields": ["author_id", "source", "context_annotations", "public_metrics", "in_reply_to_user_id", "referenced_tweets"]
            });
            data = tweet.data
            return res.status(200).json({
                data
            })
        }
    } catch (e) {
        return res.json({
            message: e
        })
    }
})

twitterRouter.get('/tweet/like', async (req, res) => {
    /**
     *Get users that liked a specific tweet.
     *
     *Method: .tweetLikedBy()
     *
     *Endpoint: tweets/:id/liking_users
     *
     *Right level: Read-only
     *
     *@param {string} tweetId
     *@param {TweetRetweetedOrLikedByV2Params} options?
     *@returns {TweetV2LikedByResult || TweetLikingUsersV2Paginator 
     */
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        })
        if (!req.query.id) return res.status(404).json({
            message: "No id provided.",
        })
        if (!user.twitterAccessToken) {
            return res.status(405).json({
                message: "No access token provided"
            })
        } else {
            const client = new TwitterApi(user.twitterAccessToken);
            const users = await client.v2.tweetLikedBy(req.query.id);
            data = users.data
            return res.status(200).json({
                data
            })
        }
    } catch (e) {
        return res.json({
            message: e
        })
    }
})


twitterRouter.get('/tweet/retweet', async (req, res) => {
    /**
     *Get users that retweeted a specific tweet.
     *
     *Method: .tweetRetweetedBy()
     *
     *Endpoint: tweets/:id/retweeted_by
     *
     *Right level: Read-only
     *
     *@param {string} tweetId
     *@param {TweetRetweetedOrLikedByV2Params} options?
     *@returns {TweetV2RetweetedByResult || TweetRetweetersUsersV2Paginator}
     */
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        })
        if (!req.query.id) return res.status(404).json({
            message: "No id provided.",
        })
        if (!user.twitterAccessToken) {
            return res.status(405).json({
                message: "No access token provided"
            })
        } else {
            const client = new TwitterApi(user.twitterAccessToken);
            const users = await client.v2.tweetRetweetedBy(req.query.id);
            data = users.data
            return res.status(200).json({
                data
            })
        }
    } catch (e) {
        return res.json({
            message: e
        })
    }
})

twitterRouter.get('/user/like', async (req, res) => {
    /**
     *Return the last likes of a specific user.
     *
     *Method: .userLikedTweets()
     *
     *Endpoint: users/:id/liked_tweets
     *
     *Right level: Read-only
     *
     *@param {string} userId
     *@param {TweetV2PaginableListParams} options?
     *@returns {TweetV2UserLikedTweetsPaginator} 
     */
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        })
        let max_results = 100
        if (req.query.max_results) {
            max_results = req.query.max_results
        }
        if (!user.twitterAccessToken) {
            return res.status(405).json({
                message: "No access token provided"
            })
        } else {
            const client = new TwitterApi(user.twitterAccessToken);
            const likes = await client.v2.userLikedTweets(user.twitterId, {max_results: max_results});
            data = likes.data.data
            return res.status(200).json({
                data
            })
        }
    } catch (e) {
        return res.json({
            message: e
        })
    }
})

module.exports = twitterRouter