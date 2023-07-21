const express = require('express');
const userController = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middleware/authJWT');
const { existingUser } = require('../middleware/isUserExist');
const router = express.Router();

router.get('/users', verifyToken, userController.findAllUser);
router.get('/users/:id', existingUser, userController.findUserById);
router.put(
  '/users/:id',
  verifyToken,
  isAdmin,
  existingUser,
  userController.updateUserById,
);
router.delete('/users/:id', existingUser, userController.deleteUserById);

module.exports = router;
