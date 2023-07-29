const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const User = require('../models').User;
const Role = require('../models').Role;

exports.findAllUser = async (req, res) => {
  const { search = '', orderBy = 'DESC', item = 'createdAt' } = req.query;
  const paramQuerySQL = {
    include: [{ model: Role, where: { id: 1 }, attributes: ['nama_role'] }],
    attributes: ['id', 'nama', 'email', 'nik', 'alamat'],
    where: {
      [Op.or]: [
        { nama: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { nik: { [Op.like]: `%${search}%` } },
        { alamat: { [Op.like]: `%${search}%` } },
      ],
    },
    limit: req.pageLimit,
    offset: req.pageOffset,
    // order: [[item, orderBy]],
  };
  try {
    const totalUsers = await User.count({
      where: {
        role_id: 1,
        [Op.or]: [
          { nama: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { nik: { [Op.like]: `%${search}%` } },
          { alamat: { [Op.like]: `%${search}%` } },
        ],
      },
    });
    const users = await User.findAll(paramQuerySQL);
    let pageNumber = req.pageNumber;
    let totalPages = Math.ceil(totalUsers / req.pageLimit);
    const response = {
      status_response: true,
      message: 'Semua data user',
      errors: null,
      data: users,
      total: totalUsers,
      page: pageNumber,
      per_page: req.pageLimit,
      total_pages: totalPages,
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
