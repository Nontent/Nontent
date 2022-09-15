const express = require('express');
const Auth = require('../../shared/auth/auth.service');
const User = require('../../mongoose/user');
const UserService = require('../user/user.service')
const {
    TwitterApi
} = require('twitter-api-v2')

// Variables to store in db
let tempCodeVerifier = null
let tempSessionState = null

const twitterRouter = require('express').Router()

require('dotenv').config();

twitterRouter.get('/', async (req, res) => {
    try {
        const user = await Auth.authenticationService(req);
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        })
        // Create a partial client for auth links
        const client = new TwitterApi({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        });
        const repClient = client.generateOAuth2AuthLink('http://localhost:3000/api/auth/twitter/callback', {
            scope: ['tweet.read', 'users.read', 'offline.access']
        });
        const {
            url,
            codeVerifier,
            state
        } = repClient
        tempCodeVerifier = codeVerifier
        tempSessionState = state
        const options = {
            twitterCodeVerifier: codeVerifier,
            twitterSessionState: state,
        }
        const updatedUser = await UserService.userUpdateService(user._id, options)
        if (!updatedUser) {
            res.status(401).json({
                message: 'User not updated'
            })
        }
        console.log('updatedUser: ' + updatedUser)
        return res.status(200).json({
            url,
            state,
            codeVerifier
        });
    } catch (err) {
        console.log('ERROR twitter OAuth => ', err);
        return res.send(err);
    }
})

twitterRouter.get('/callback', async (req, res) => {
    try {
        const {
            state,
            code
        } = req.query
        const user = await User.getUserByState(state)
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            })
        }
        if (!user.twitterSessionState || !state || !user.twitterCodeVerifier || !code) {
            return res.status(400).send('You denied the app or your session expired!');
        }
        // // Obtain access token
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
            codeVerifier: user.twitterCodeVerifier,
            redirectUri: 'http://localhost:3000/api/auth/twitter/callback'
        });
        return res.status(200).json({
            message: "User connected.",
            clien: loggedClient,
            access_token: accessToken,
            refresh_token: refreshToken
        })
    } catch (err) {
        console.log('ERROR twitter OAuth callback => ', err);
        return res.send(err);
    }
})

module.exports = twitterRouter