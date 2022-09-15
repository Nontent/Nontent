const rootRouter = require('express').Router();

rootRouter.use('/api/signin', require('./signin/signin.routes'));
rootRouter.use('/api/user', require('./user/user.routes'));
rootRouter.use('/api/auth/twitter', require('./oauth/oauth.routes'))

module.exports = rootRouter;
