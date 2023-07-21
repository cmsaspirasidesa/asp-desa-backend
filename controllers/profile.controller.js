const bcrypt = require('bcrypt');
const User = require('../models').User;
const Role = require('../models').Role;


exports.getUserProfile = async (req, res) => {
  try {
    const id = req.userId;
    const theUser = await User.findByPk(id, {
      include: [{ model: Role, where: { id: 1 }, attributes: ['nama_role'] }],
      attributes: ['email', 'password', 'alamat'],
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

exports.updateProfile = async (req, res) => {
  try {
    const id = req.userId;
    const { email, password, alamat } = req.body;
    const data = {
      email,
      password,
      alamat,
    };
    if (password) {
      data.password = bcrypt.hashSync(password, 8);
    }
    const user = await User.update(data, { where: { id } });
    const response = {
      status_response: true,
      message: 'Profile berhasil di update',
      errors: null,
      data: user,
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


