/* eslint-disable no-unused-vars */
const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    const token =
      'Bearer ' +
      jwt.sign({ id: user.id }, process.env.TOKEN, {
        expiresIn: '24h',
      });
    const response = {
      status_response: true,
      message: 'Registrasi berhasil',
      errors: null,
      data: { ...others, token },
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
