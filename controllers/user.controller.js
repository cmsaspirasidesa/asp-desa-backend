const User = require('../models').User;
const Role = require('../models').Role;

exports.findAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role, where: { id: 1 }, attributes: ['nama_role'] }],
      attributes: ['id', 'nama', 'email', 'nik'],
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


exports.findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const theUser = await User.findByPk(id, {
      attributes: ['id', 'nama', 'email', 'alamat', 'nik'],
    });
    if (theUser === null || !theUser) {
      return res.status(404).send('not found');
    }
    const response = {
      status_response: true,
      message: 'Detail data user',
      errors: null,
      data: theUser,
    };
    res.status(200).send(response);
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
