const jwt = require('jsonwebtoken');
const User = require('../models/index.js').User;

exports.verifyToken = (req, res, next) => {
  const tokenHeader = req.headers.Authorization || req.headers.authorization;
  if (!tokenHeader || tokenHeader.split(' ')[0] !== 'Bearer') {
    const response = {
      status_response: false,
      message: 'Invalid token format',
      errors: 'Error',
      data: null,
    };
    res.status(500).send(response);
    return;
  }

  const token = tokenHeader.split(' ')[1];
  if (!token) {
    const response = {
      status_response: false,
      message: 'No token provided',
      errors: 'Error',
      data: null,
    };
    res.status(403).send(response);
    return;
  }
  jwt.verify(token, process.env.TOKEN, (error, decoded) => {
    if (error) {
      const response = {
        status_response: false,
        message: 'Invalid token',
        errors: error.message,
        data: null,
      };
      res.status(500).send(response);
      return;
    }
    req.userId = decoded.id;
    next();
  });
};

exports.isAdmin = async (req, res, next) => {
  const id = req.userId;
  const user = await User.findOne({ where: id });
  if (!user) {
    const response = {
      status_response: false,
      message: 'User not found',
      errors: 'Data Not Found',
      data: null,
    };
    res.status(404).send(response);
    return;
  }
  if (user.role_id !== 2) {
    const response = {
      status_response: false,
      message: 'Hanya admin yang dapat mengakses',
      errors: 'Error',
      data: null,
    };
    res.status(403).send(response);
    return;
  }
  next();
};
