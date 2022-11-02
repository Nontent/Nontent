exports.getPosts = async (body) => {
    let username = body.username
    let password = body.password
    return new Promise(async (resolve, reject) => {
        if (!username || !password) {
            return reject({ error: 'Missing username or password' });
        }
        resolve("Username: " + username + " Password: " + password);
    })
}
