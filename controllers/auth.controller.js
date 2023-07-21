/* eslint-disable no-unused-vars */
const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const generateAccessToken = (id) => {
  return jwt.sign(id, process.env.ACCESS, {
    expiresIn: '20s',
  });
};
const generateRefreshToken = (id) => {
  return jwt.sign(id, process.env.REFRESH, {
    expiresIn: '40s',
  });
};

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
    const accsesToken = 'Bearer ' + generateAccessToken({ id: user.id });
    const refreshToken = 'Bearer ' + generateRefreshToken({ id: user.id });
    // const currentDate = newDate.now() + 604800;
    const data = {
      access_token: accsesToken,
      refresh_token: refreshToken,
      // expire: currentDate,
    };
    await User.update(data, { where: { id: user.dataValues.id } });
    const response = {
      status_response: true,
      message: 'Registrasi berhasil',
      errors: null,
      data: { ...others, accsesToken },
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
    const { email, password: pw } = req.body;

    const theUser = await User.findOne({
      where: { email: email },
    });
    const { password, ...others } = theUser.dataValues;
    const decPass = bcrypt.compareSync(pw, theUser.password);
    let token;
    if (theUser && decPass) {
      token = generateAccessToken({ id: theUser.id });
    }
    if (!decPass || !theUser.email) {
      res.status(403).send({
        message: 'Email or password is incorrect!',
        error: err,
      });
    }
    const refreshToken = 'Bearer ' + generateRefreshToken({ id: theUser.id });

    await User.update(
      { refresh_token: refreshToken },
      { where: { id: theUser.id } },
    );
    const response = {
      status_response: true,
      message: 'Login berhasil',
      errors: null,
      data: { ...others, token },
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      message: 'Error while signing Admin!',
      error: error,
    };
    res.status(404).send(response);
  }
};
