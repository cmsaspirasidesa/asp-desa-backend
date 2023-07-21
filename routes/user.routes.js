const express = require('express');
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/authJWT');
const router = express.Router();

router.get('/users', userController.findAllUser);
router.get('/users/:id', userController.findUserById);
router.put('/users/:id', verifyToken, userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
