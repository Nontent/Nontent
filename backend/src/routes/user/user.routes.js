const Auth = require('../../shared/auth/auth.service');
const UserService = require ('./user.service');

const userRouter = require('express').Router();

userRouter.post('/', async (req, res) => {
    try {
        const userRequest = UserService.isUserCreationRequestCorrect(req.body);
        const response = await UserService.userCreationService(userRequest);
        return res.send(response);
    } catch (error) {
        console.log('ERROR => ', error.message);
        res.status(401).json({ error: 'Authentication failed' });
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
        res.status(404).json({ error: "This ressource doesn't exist" });
    }
});

userRouter.put('/update/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        Auth.authenticationService(req);

        const response = await UserService.userUpdateService(userId, req.body);
        return res.send(response);
    } catch (error) {
        console.log('ERROR => ', error);
        res.status(404).json({ error: "This ressource doesn't exist" });
    }
})

module.exports = userRouter;
