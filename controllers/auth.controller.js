const User = require('../models').User;
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { nama, email, password, alamat, nik } = req.body;
    if (!nama || !email || !password || !alamat || !nik) {
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
      password: bcrypt.hashSync(password, 8),
      alamat,
      nik,
    });

    res.status(200).json(user);
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
