const express = require('express');
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/authJWT');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/logout', verifyToken, authController.logout);

module.exports = router;
