const User = require('../models/index.js').User;

exports.checkStatusUser = async (req, res, next) => {
  const id = req.userId;
  const user = await User.findByPk(id);
  if (user.status === 'mute') {
    const response = {
      status_response: false,
      message: 'Akun anda sedang dibisukan',
      errors: 'Forbidden',
    };
    return res.status(403).send(response);
  }
  next();
};
