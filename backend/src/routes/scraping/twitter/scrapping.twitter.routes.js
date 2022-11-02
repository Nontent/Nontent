
const ScrappingTwitterService = require ('./scrapping.twitter.service');

const scrappingTwitterRouter = require('express').Router();

scrappingTwitterRouter.post('/posts', async (req, res) => {
    try {
        const getRequest = await ScrappingTwitterService.getPosts(req.body);
        return res.send(getRequest);
    } catch (error) {
        console.log('ERROR => ', error, error.message);
        return res.send(error);
    }

});


module.exports = scrappingTwitterRouter;
