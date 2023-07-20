const User = require('../models').User;

exports.findAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'nama', 'email', 'alamat', 'nik'],
    });
    const response = {
      status_response: true,
      message: 'Semua data user',
      errors: null,
      data: users,
    };
    res.status(200).json(response);
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
