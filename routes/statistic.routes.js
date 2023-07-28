const express = require('express');
const { verifyToken, isAdmin, isUser } = require('../middleware/authJWT');
const router = express.Router();
const statisticController = require('../controllers/statistic.controller');

router.get('/statistic', statisticController.getStatisticAsp);

module.exports = router;
