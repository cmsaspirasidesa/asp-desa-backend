const express = require('express');
const userController = require('../controllers/user.controller');
const profileController = require('../controllers/profile.controller');
const { verifyToken, isAdmin } = require('../middleware/authJWT');
const { existingUser } = require('../middleware/isUserExist');
const { paginate } = require('../middleware/paginate');
const router = express.Router();

router.get('/users', paginate, userController.findAllUser);
router.get('/users/:id', existingUser, userController.findUserById);
router.put(
  '/users/:id',
  verifyToken,
  isAdmin,
  existingUser,
  userController.updateUserById,
);
router.delete('/users/:id', existingUser, userController.deleteUserById);

router.get('/profile', verifyToken, profileController.getUserProfile);
router.put('/profile', verifyToken, profileController.updateProfile);

module.exports = router;
