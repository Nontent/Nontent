require('dotenv').config()
const TwitterPosts = require('../../../mongoose/twitterPosts');

exports.postPosts = async (body) => {
    let tokenNontent = body.tokenNontent
    let posts = body.posts
    return new Promise(async (resolve, reject) => {
        if (!tokenNontent || !posts || posts.length === 0) {
            return reject({ error: 'Missing tokenNontent or posts' });
        }
        for (let i = 0; i < posts.length; i++) {
            let post = posts[i];
            let accountName = post.accountName;
            let content = post.content;
            let nbComments = post.nbComments;
            let nbLikes = post.nbLikes;
            let nbRetweets = post.nbRetweets;
            let postToSave = {
                accountName: accountName,
                content: content,
                nbComments: nbComments,
                nbLikes: nbLikes,
                nbRetweets: nbRetweets,
                tokenNontent: tokenNontent,
            }
            if (accountName && accountName !== '' && typeof accountName === 'string' && content && typeof content === 'string' && nbComments && typeof nbComments === 'number' && nbLikes && typeof nbLikes === 'number' && nbRetweets && typeof nbRetweets === 'number') {
                try {
                    await TwitterPosts.addTwitterPosts(postToSave);
                } catch (error) {
                    console.log('postToSave => ', postToSave);
                    console.log('ERROR IN addTwitterPosts FUNCTION => ', error);
                }
            }
        }
        resolve("tokenNontent: " + tokenNontent + " Posts: " + posts);
    })
}
