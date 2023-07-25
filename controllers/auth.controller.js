/* eslint-disable no-unused-vars */
const User = require('../models').User;
const Role = require('../models').Role;
const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateToken');

require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { nama, email, password: pw, alamat, nik } = req.body;
    if (!nama || !email || !pw || !alamat || !nik) {
      const response = {
        status_response: false,
        message: `Mohon masukan data secara lengkap nama, email, password, alamat dan NIK`,
        errors: 'Inclomplete Data',
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    const user = await User.create({
      nama,
      email,
      password: bcrypt.hashSync(pw, 8),
      alamat,
      nik,
    });
    const { password, ...others } = await user.dataValues;
    const response = {
      status_response: true,
      message: 'Registrasi berhasil',
      errors: null,
      data: { ...others },
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

exports.login = async (req, res) => {
  try {
    // get the user by email
    const { email, password: pw } = req.body;
    const theUser = await User.findOne({
      where: { email: email },
    });
    let accsesToken;
    let refreshToken;

    // check is the password correct
    const decPass = bcrypt.compareSync(pw, theUser.password);
    if (theUser && decPass) {
      accsesToken = 'Bearer ' + generateAccessToken({ id: theUser.id });
      refreshToken = 'Bearer ' + generateRefreshToken({ id: theUser.id });
    }
    if (!decPass || !theUser.email) {
      res.status(403).send({
        message: 'Email or password is incorrect!',
        error: err,
      });
    }

    const currentDate = new Date();
    const oneDaysFromNow = new Date(currentDate);
    oneDaysFromNow.setDate(oneDaysFromNow.getDate() + 1);

    const expire = oneDaysFromNow.toISOString().slice(0, 19).replace('T', ' ');

    const data = {
      access_token: accsesToken,
      refresh_token: refreshToken,
      expire,
    };
    await User.update(data, { where: { id: theUser.id } });

    // to provide user data
    const displayUser = await User.findOne({
      where: { email: email },
      attributes: ['nama', 'email', 'access_token', 'refresh_token', 'role_id'],
      include: { model: Role, attributes: ['nama_role'] },
    });
    // setup response
    const response = {
      status_response: true,
      message: 'Login berhasil',
      errors: null,
      data: displayUser,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      message: 'Error while signing Admin!',
      error: error,
    };
    console.log(error);
    res.status(404).send(response);
  }
};

exports.logout = async (req, res) => {
  try {
    const data = {
      access_token: null,
      refresh_token: null,
      expire: null,
    };
    await User.update(data, { where: { id: req.userId } });
    const response = {
      status_response: true,
      message: 'User berhasil logout',
      errors: null,
      data: null,
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
