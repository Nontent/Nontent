const express = require('express')
const SigninService = require('./signin.service');

const signinRouter = express.Router();

signinRouter.post('/', async (req, res) => {
    try {
        const signinRequest = SigninService.isSigninRequestValid(req.body);
        const response = await SigninService.verifyConnectionAuthorization(signinRequest);
        return res.send(response);
    } catch (error) {
        console.log('ERROR => ', error.message);
        res.status(401).json({ error: 'Authentication failed' });
    }
});

module.exports = signinRouter;
