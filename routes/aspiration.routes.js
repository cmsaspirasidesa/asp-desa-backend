const express = require('express');
const { verifyToken, isAdmin, isUser } = require('../middleware/authJWT');
const router = express.Router();
const aspirationController = require('../controllers/aspiration.controller');
const upload = require('../middleware/multer');

router.post(
  '/aspirations',
  verifyToken,
  upload.array('images', 4),
  aspirationController.addAspiration,
);
router.get('/aspirations', aspirationController.getAllAspirations);
router.get('/aspirations/:id', aspirationController.getAspirationById);
router.get(
  '/useraspirations',
  verifyToken,
  isUser,
  aspirationController.getUserAspirations,
);
router.put(
  '/aspirations/:id',
  verifyToken,
  isAdmin,
  aspirationController.updateAspByAdmin,
);
router.put(
  '/aspirations/:id/user',
  verifyToken,
  isUser,
  aspirationController.updateAspByUser,
);
router.delete(
  '/aspirations/:id/user',
  verifyToken,
  isUser,
  aspirationController.deleteAspByUser,
);

module.exports = router;
