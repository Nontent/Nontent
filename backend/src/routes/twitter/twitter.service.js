const TwitterPosts = require('../../mongoose/twitterPosts');
const UserTweet = require('../../mongoose/userTweet');

exports.addTweet = async (array, client, userId, type) => {
    for (const data of array) {
        const singleTweet = await client.v2.singleTweet(data.id, {
            "tweet.fields": ["author_id", "source", "context_annotations", "public_metrics", "in_reply_to_user_id", "referenced_tweets"]
        });
        singleTweetData = singleTweet.data
        const context_annotations = []
        if (singleTweetData.context_annotations) {
            for (const annotation of singleTweetData.context_annotations) {
                if (context_annotations.indexOf(annotation.entity.name) === -1) {
                    context_annotations.push(annotation.entity.name)
                }
            }
        }
        const post = {
            authorId: singleTweetData.author_id,
            tweetId: singleTweetData.id,
            text: singleTweetData.text,
            nbLikes: singleTweetData.public_metrics.like_count,
            nbRetweets: singleTweetData.public_metrics.retweet_count,
            contextAnnotations: context_annotations,
        }
        try {
            const postId = await TwitterPosts.addTwitterPosts(post);
            const userTweet = {
                userId: userId,
                tweetId: postId,
                from: type
            }
            try {
                await UserTweet.addUserTweet(userTweet);
            } catch (error) {
                console.log('error in addUserTweet => ', error);
            }
        } catch (error) {
            console.log('error in addTwitterPosts => ', error);
        }
    }
}