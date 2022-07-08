//TODO: 
//  - services
//  - store codeVerifier and sessionState in bdd

const asyncHandler = require('express-async-handler');
const {
    TwitterApi
} = require('twitter-api-v2')

// Variables to store in db
let tempCodeVerifier = null
let tempSessionState = null

const loginUser = asyncHandler(async (req, res) => {

    // Create a partial client for auth links
    const client = new TwitterApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    });
    const {
        url,
        codeVerifier,
        state
    } = client.generateOAuth2AuthLink('http://www.localhost:5000/api/auth/twitter/callback', {
        scope: ['tweet.read', 'users.read', 'offline.access']
    });
    tempCodeVerifier = codeVerifier
    tempSessionState = state
    return res.status(200).json({
        url,
        state,
        codeVerifier
    });
});

const handleCallback = asyncHandler(async (req, res) => {
    const codeVerifier = tempCodeVerifier;
    const sessionState = tempSessionState;
    // Extract state and code from query string
    const {
        state,
        code
    } = req.query;
    // Get the saved codeVerifier from session
    // console.log('state', state, 'code', code, 'codeVerifier', codeVerifier, 'sessionState', sessionState);
    if (!codeVerifier || !state || !sessionState || !code) {
        return res.status(400).send('You denied the app or your session expired!');
    }
    if (state !== sessionState) {
        return res.status(400).send('Stored tokens didnt match!');
    }
    // Obtain access token
    const client = new TwitterApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    });
    const {
        client: loggedClient,
        accessToken,
        refreshToken
    } = await client.loginWithOAuth2({
        code,
        codeVerifier,
        redirectUri: 'http://www.localhost:5000/api/auth/twitter/callback'
    });
    return res.status(200).json({
        message: "User connected.",
        clien: loggedClient,
        access_token: accessToken,
        refresh_token: refreshToken
    })
})

module.exports = {
    loginUser,
    handleCallback
}