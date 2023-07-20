const express = require('express');
const { findAllUser } = require('../controllers/user.controller');
const router = express.Router();

router.get('/users', findAllUser);

module.exports = router;
