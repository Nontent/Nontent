const express = require('express')
const SigninService = require('./signin.service');

const signinRouter = express.Router();

signinRouter.post('/', async (req, res) => {
    try {
        const signinRequest = SigninService.isSigninRequestValid(req.body);
        const response = await SigninService.verifyConnectionAuthorization(signinRequest);

        return res.send(response);
    } catch (error) {
        console.log('ERROR => ', error);
        return res.send(error);
    }
});

module.exports = signinRouter;
