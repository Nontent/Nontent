require('dotenv').config()
const TwitterPosts = require('../../../mongoose/twitterPosts');

exports.postPosts = async (body) => {
    let tokenNontent = body.tokenNontent
    let posts = body.posts
    return new Promise(async (resolve, reject) => {
        if (!tokenNontent || !posts) {
            return reject({ error: 'Missing tokenNontent or posts' });
        }
        console.log(posts.length)
        console.log(posts[0])
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
            }
            console.log(postToSave)
            await TwitterPosts.addTwitterPosts(postToSave)
        }
        resolve("tokenNontent: " + tokenNontent + " Posts: " + posts);
    })
}
