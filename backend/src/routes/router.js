const rootRouter = require('express').Router();

rootRouter.use('/api/signin', require('./signin/signin.routes'));
rootRouter.use('/api/user', require('./user/user.routes'));

module.exports = rootRouter;
