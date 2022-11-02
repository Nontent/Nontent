
const ScrappingRedditService = require ('./scrapping.reddit.service');

const scrappingRedditRouter = require('express').Router();

scrappingRedditRouter.post('/posts', async (req, res) => {
    try {
        const getRequest = await ScrappingRedditService.getPosts(req.body);
        return res.send(getRequest);
    } catch (error) {
        console.log('ERROR => ', error, error.message);
        return res.send(error);
    }

});


module.exports = scrappingRedditRouter;
