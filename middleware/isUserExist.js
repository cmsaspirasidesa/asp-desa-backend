const User = require('../models/index.js').User;

exports.existingUser = async (req, res, next) => {
  const user = await User.findAll({ where: { id: req.params.id } });
  if (user.length === 0) {
    const notFound = {
      status_response: false,
      message: 'User tidak di temukan',
      errors: 'Not Found',
      data: null,
    };
    return res.status(404).send(notFound);
  }
  next();
};
