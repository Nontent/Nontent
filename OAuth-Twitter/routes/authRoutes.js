const express = require('express');
const router = express.Router();
const { loginUser, handleCallback } = require('../controllers/authController')

router.get('/twitter', loginUser)
router.get('/twitter/callback', handleCallback)

module.exports = router

