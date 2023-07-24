const express = require('express');
const { verifyToken } = require('../middleware/authJWT');
const router = express.Router();
const aspirationController = require('../controllers/aspiration.controller');
const upload = require('../middleware/multer');

router.post(
  '/aspirations',
  verifyToken,
  upload.array('images', 2),
  aspirationController.addAspiration,
);

module.exports = router;
