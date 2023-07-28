const bcrypt = require('bcrypt');
const User = require('../models').User;
const Role = require('../models').Role;

exports.findAllUser = async (req, res) => {
  const paramQuerySQL = {
    include: [{ model: Role, where: { id: 1 }, attributes: ['nama_role'] }],
    attributes: ['id', 'nama', 'email', 'nik', 'alamat'],
    limit: req.pageLimit,
    offset: req.pageOffset,
  };
  try {
    const users = await User.findAll(paramQuerySQL);
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
      include: [{ model: Role, where: { id: 1 }, attributes: ['nama_role'] }],
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

exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, alamat } = req.body;
    const data = {
      email,
      alamat,
    };
    if (password) {
      data.password = bcrypt.hashSync(password, 8);
    }
    await User.update(data, { where: { id } });
    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'nama', 'email', 'alamat', 'nik'],
    });
    const response = {
      status_response: true,
      message: 'User berhasil di update',
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

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    const response = {
      status_response: true,
      message: 'User berhasil dihapus',
      errors: null,
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
