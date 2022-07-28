const Auth = require('../../shared/auth/auth.service');
const UserService = require ('./user.service');

const userRouter = require('express').Router();

userRouter.post('/', async (req, res) => {
    try {
        const userRequest = UserService.isUserCreationRequestCorrect(req.body);
        const response = await UserService.userCreationService(userRequest);
        return res.send(response);
    } catch (error) {
        console.log('ERROR => ', error);
        return res.send(error);
    }

});

userRouter.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        Auth.authenticationService(req);

        const response = await UserService.getUserHandler(userId);
        return res.send(response);
    } catch (error) {
        console.log('ERROR => ', error);
        return res.send(error);
    }
});

module.exports = userRouter;
