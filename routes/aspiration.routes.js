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
router.get('/aspirations/:id', aspirationController.getAspirationById);

module.exports = router;
