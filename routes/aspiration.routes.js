const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/authJWT');
const router = express.Router();
const aspirationController = require('../controllers/aspiration.controller');
const upload = require('../middleware/multer');
const { checkStatusUser } = require('../middleware/userMute');

router.post(
  '/aspirations',
  verifyToken,
  checkStatusUser,
  upload.array('images', 4),
  aspirationController.addAspByUser,
);
router.post(
  '/aspirations/guest',
  upload.array('images', 4),
  aspirationController.addAspByGuest,
);
router.get('/aspirations', aspirationController.getAllAspirations);
router.get('/aspirations/:id', aspirationController.getAspirationById);
router.get(
  '/useraspirations',
  verifyToken,
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
  aspirationController.updateAspByUser,
);
router.delete(
  '/aspirations/:id',
  verifyToken,
  aspirationController.deleteAspByUser,
);
router.get(
  '/aspirations/statistics/per_month',
  aspirationController.getStatPerMount,
);

router.get(
  '/aspirations/statistics/per_week',
  aspirationController.getStatPerWeek,
);

module.exports = router;
