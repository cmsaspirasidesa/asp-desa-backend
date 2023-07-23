const express = require('express');
const { verifyToken } = require('../middleware/authJWT');
const tokenController = require('../controllers/token.controller');
const router = express.Router();

router.get('/token', verifyToken, tokenController.refreshToken);

module.exports = router;
