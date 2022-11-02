const rootRouter = require('express').Router();

rootRouter.use('/api/signin', require('./signin/signin.routes'));
rootRouter.use('/api/user', require('./user/user.routes'));
rootRouter.use('/api/auth/twitter', require('./oauth/oauth.routes'));
rootRouter.use('/api/scrapping/reddit', require('./scraping/reddit/scrapping.reddit.routes'));
rootRouter.use('/api/scrapping/twitter', require('./scraping/twitter/scrapping.twitter.routes'));

module.exports = rootRouter;
