const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../utils/generateToken.js');
const User = require('../models/index.js').User;

exports.refreshToken = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });
    const refreshToken = user.dataValues.refresh_token;
    if (!user) {
      return res.sendStatus(403);
    }
    jwt.verify(
      refreshToken.split(' ')[1],
      process.env.REFRESH,
      async (error, decoded) => {
        if (error || user.dataValues.expire <= new Date()) {
          const response = {
            status_response: false,
            message:
              `${error.message}, mohon login kembali` ||
              'Mohon untuk login kembali',
            errors: error || 'token expired',
            data: null,
          };
          return res.status(403).send(response);
        }
        const accessToken = generateAccessToken({ id: req.userId });
        await User.update(
          { access_token: `Bearer ${accessToken}` },
          { where: { id: req.userId } },
        );
        const response = {
          status_response: false,
          message: 'Token telah di perbaharui',
          errors: null,
          data: { accessToken: `Bearer ${accessToken}` },
        };
        res.status(200).send(response);
      },
    );
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      errors: error,
      data: null,
    };
    res.status(500).send(response);
  }
};
