const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/users', userController.findAllUser);
router.get('/users/:id', userController.findUserById);

module.exports = router;
