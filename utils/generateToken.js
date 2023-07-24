const jwt = require('jsonwebtoken');

exports.generateAccessToken = (id) => {
  return jwt.sign(id, process.env.ACCESS, {
    expiresIn: '12h',
  });
};
exports.generateRefreshToken = (id) => {
  return jwt.sign(id, process.env.REFRESH, {
    expiresIn: '24h',
  });
};
