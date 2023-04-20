const rootRouter = require('express').Router();

rootRouter.use('/api/signin', require('./signin/signin.routes'));
rootRouter.use('/api/user', require('./user/user.routes'));
rootRouter.use('/api/auth/twitter', require('./oauth/oauth.routes'));
rootRouter.use('/api/twitter', require('./twitter/twitter.routes'));
rootRouter.use('/api/user/reddit', require('./user/userReddit.routes'));
rootRouter.use('/api/auth/twitter', require('./oauth/oauth.routes'));
rootRouter.use('/api/auth/reddit', require('./oauth/oauthReddit.routes'));
rootRouter.use('/api/scrapping/reddit', require('./scraping/reddit/scrapping.reddit.routes'));

module.exports = rootRouter;
