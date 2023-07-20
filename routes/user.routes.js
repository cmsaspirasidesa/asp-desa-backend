const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/users', userController.findAllUser);
router.get('/users/:id', userController.findUserById);
router.put('/users/:id', userController.updateUserById);

module.exports = router;
