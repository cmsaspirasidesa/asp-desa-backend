const express = require('express');
const { verifyToken } = require('../middleware/authJWT');
const router = express.Router();
const aspirationController = require('../controllers/aspiration.controller');
const upload = require('../middleware/multer');

router.post(
  '/aspirations',
  upload.array('images', 2),
  verifyToken,
  aspirationController.addAspiration,
);
<<<<<<< HEAD
router.get('/aspirations/:id', aspirationController.getAspirationById);
=======
router.get('/aspirations', aspirationController.getAllAspirations);
>>>>>>> f2928d6e5aba3ba24034193864a28a0a6b673ca5

module.exports = router;
