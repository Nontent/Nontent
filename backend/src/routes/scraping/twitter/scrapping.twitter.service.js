require('dotenv').config()

exports.postPosts = async (body) => {
    let username = body.username
    let password = body.password
    let posts = body.posts
    return new Promise(async (resolve, reject) => {

        // console.log(process.env.TWITTER_USERNAME)
        // console.log(process.env.TWITTER_PASSWORD)

        console.log(username)
        console.log(password)
        console.log(posts)




        if (!username || !password) {
            return reject({ error: 'Missing username or password' });
        }
        resolve("Username: " + username + " Password: " + password + " Posts: " + posts);
    })
}
