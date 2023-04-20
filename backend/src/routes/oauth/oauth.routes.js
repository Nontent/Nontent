const express = require('express');
const Auth = require('../../shared/auth/auth.service');
const User = require('../../mongoose/user');
const UserService = require('../user/user.service')
const {
    TwitterApi
} = require('twitter-api-v2')

const twitterAuthRouter = require('express').Router()

require('dotenv').config();

twitterAuthRouter.get('/', async (req, res) => {
    try {
        const user = await Auth.authenticationService(req);
        console.log("USER =>", user)
        if (!user) return res.status(403).json({
            message: "Unauthorized",
            status: 403
        })
        const client = new TwitterApi({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        });
        if(!user.twitterAccessToken){
            // Create a partial client for auth links
            const repClient = client.generateOAuth2AuthLink('http://www.localhost:1390/twitterCallback', {
                scope: ['tweet.read', 'users.read', 'offline.access', 'like.read', 'follows.read']
            });
            const {
                url,
                codeVerifier,
                state
            } = repClient
            const options = {
                twitterCodeVerifier: codeVerifier,
                twitterSessionState: state,
                socialNetworks: "Twitter"
            }
            const updatedUser = await UserService.userUpdateService(user._id, options)
            if (!updatedUser) {
                res.status(401).json({
                    message: 'User not updated'
                })
            }
            return res.status(200).json({
                url,
                state,
                codeVerifier
            });
        } else {
            try {
                refreshToken = user.twitterRefreshToken
                const { client: refreshedClient, accessToken, refreshToken: newRefreshToken } = await client.refreshOAuth2Token(refreshToken);
                const options = {
                    twitterAccessToken: accessToken,
                    twitterRefreshToken: newRefreshToken,
                }
                const updatedUser = await UserService.userUpdateService(user._id, options)
                if (!updatedUser) {
                    res.status(401).json({
                        message: 'User not updated'
                    })
                }
                return res.status(200).json({
                    refreshedClient
                });
            } catch (error) {
                console.log('Error refresh token', error);
                return res.send(error);
            }
        }
    } catch (err) {
        console.log('ERROR twitter OAuth => ', err);
        return res.send(err);
    }
})

twitterAuthRouter.post('/callback', async (req, res) => {
    try {
        console.log("REQ.QUERY =>", req.body)
        const code = req.body.code
		const state = req.body.state
        const user = await User.getUserByState(state)

        if (!user) {
            res.status(404).json({
                message: 'User not found'
            })
        }
        if (!user.twitterSessionState || !state || !user.twitterCodeVerifier || !code) {
            return res.status(400).send('You denied the app or your session expired!');
        }
        if (state !== user.twitterSessionState) {
            return res.status(400).send('Stored tokens didnt match!');
        }
        // obtain access token
        const client = new TwitterApi({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        });
		console.log("CLIENT =>", client)
        const {
            client: loggedClient,
            accessToken,
            refreshToken,
            expiresIn
        } = await client.loginWithOAuth2({
            code,
            codeVerifier: user.twitterCodeVerifier,
            redirectUri: 'http://www.localhost:1390/twitterCallback'
        });
        const userInfo = await loggedClient.v2.me();
        const options = {
            twitterAccessToken: accessToken,
            twitterRefreshToken: refreshToken,
            twitterId: userInfo.data.id,
            twitterUsername: userInfo.data.username
        }
        const updatedUser = await UserService.userUpdateService(user._id, options)
        if (!updatedUser) {
            res.status(401).json({
                message: 'User not updated'
            })
        }
        return res.status(200).json({
            message: "User connected.",
            client: loggedClient,
            access_token: accessToken,
            refresh_token: refreshToken,
            expiresIn: expiresIn
        })
    } catch (err) {
        console.log('ERROR twitter OAuth callback => ', err);
        return res.send(err);
    }
})

module.exports = twitterAuthRouter