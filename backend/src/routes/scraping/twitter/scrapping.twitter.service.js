require('dotenv').config()

exports.postPosts = async (body) => {
    let tokenNontent = body.tokenNontent
    let posts = body.posts
    return new Promise(async (resolve, reject) => {
        console.log(tokenNontent)
        console.log(posts)
        if (!tokenNontent || !posts) {
            return reject({ error: 'Missing tokenNontent or posts' });
        }
        resolve("tokenNontent: " + tokenNontent + " Posts: " + posts);
    })
}
