const { Op, Sequelize } = require('sequelize');
const Aspiration = require('../models').Aspiration;
const Image = require('../models').Image;
const User = require('../models').User;
const fs = require('fs');

exports.addAspByUser = async (req, res) => {
  try {
    const { judul, deskripsi, lokasi, ditujukan, kategori } = req.body;
    if (!judul || !deskripsi || !lokasi || !ditujukan || !kategori) {
      const response = {
        status_response: false,
        message: 'Data harus memiliki judul, deskripsi, dan lokasi',
        errors: 'Bad request',
        data: null,
      };
      return res.status(400).send(response);
    }
    const data = {
      user_id: req.userId,
      email: req.userEmail,
      nama: req.username,
      judul,
      kategori,
      ditujukan,
      deskripsi,
      lokasi,
    };
    const aspiration = await Aspiration.create(data);
    const image = [];

    for (let i = 0; i < req.files.length; i++) {
      const link = `${req.protocol}://${req.get('host')}/${
        req.files[i].filename
      }`;

      await Image.create({ aspirasi_id: aspiration.id, url: link });

      image.push(link);
    }
    const response = {
      status_response: true,
      message: 'Aspirasi berhasil ditambahkan',
      errors: null,
      data: { ...aspiration.dataValues, image },
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

exports.addAspByGuest = async (req, res) => {
  try {
    const { judul, deskripsi, lokasi, email, nama, ditujukan, kategori } =
      req.body;
    if (
      !judul ||
      !deskripsi ||
      !lokasi ||
      !email ||
      !nama ||
      !ditujukan ||
      kategori
    ) {
      const response = {
        status_response: false,
        message:
          'Data harus memiliki judul, deskripsi, lokasi, nama, dan email',
        errors: 'Bad request',
        data: null,
      };
      return res.status(400).send(response);
    }
    const data = {
      nama,
      user_id: null,
      email,
      judul,
      kategori,
      ditujukan,
      deskripsi,
      lokasi,
    };
    const aspiration = await Aspiration.create(data);
    const image = [];

    for (let i = 0; i < req.files.length; i++) {
      const link = `${req.protocol}://${req.get('host')}/${
        req.files[i].filename
      }`;

      await Image.create({ aspirasi_id: aspiration.id, url: link });

      image.push(link);
    }
    const response = {
      status_response: true,
      message: 'Aspirasi berhasil ditambahkan',
      errors: null,
      data: { ...aspiration.dataValues, image },
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

exports.getAllAspirations = async (req, res) => {
  try {
    const {
      search = '',
      status,
      limit = '10',
      page = '1',
      item = 'createdAt',
      orderBy = 'DESC',
    } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit) || 0;

    let whereClause = {};
    if (status) {
      whereClause = {
        [Op.and]: [
          { status },
          {
            [Op.or]: [
              { email: { [Op.like]: `%${search}%` } },
              { judul: { [Op.like]: `%${search}%` } },
            ],
          },
        ],
      };
    } else {
      whereClause = {
        [Op.or]: [
          { email: { [Op.like]: `%${search}%` } },
          { judul: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    const data = await Aspiration.findAll({
      include: [
        { model: Image, attributes: ['id', 'url'] },
        {
          model: User,
          attributes: ['id', 'nama', 'email', 'nik'],
          where: {
            [Op.or]: [{ nik: { [Op.like]: `%${search}%` } }],
          },
          required: false,
        },
      ],
      limit: parseInt(limit),
      offset: offset,
      where: whereClause,
      order: [[item, orderBy]],
    });
    const total = await Aspiration.count({
      where: whereClause,
    });
    const response = {
      status_response: true,
      message: 'Daftar aspirasi',
      errors: null,
      data: {
        data,
        total,
        page: parseInt(page),
        per_page: parseInt(limit),
        total_page: Math.ceil(total / limit),
      },
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

exports.getAspirationById = async (req, res) => {
  try {
    const { id } = req.params;
    const theAspiration = await Aspiration.findByPk(id, {
      include: {
        model: Image,
        attributes: ['url', 'aspirasi_id'],
      },
    });
    if (theAspiration === null || !theAspiration) {
      return res.status(404).send('not found');
    }
    const response = {
      status_response: true,
      message: 'Detail aspirasi',
      errors: null,
      data: theAspiration,
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

exports.getUserAspirations = async (req, res) => {
  try {
    const {
      search = '',
      status = '',
      limit = '10',
      page = '1',
      item = 'createdAt',
      orderBy = 'DESC',
    } = req.query;
    const id = req.userId;
    const offset = (parseInt(page) - 1) * parseInt(limit) || 0;

    let whereClause = {};
    if (status) {
      whereClause = {
        [Op.and]: [
          { status },
          { judul: { [Op.like]: `%${search}%` } },
          { user_id: id },
        ],
      };
    } else {
      whereClause = {
        [Op.and]: [{ judul: { [Op.like]: `%${search}%` } }, { user_id: id }],
      };
    }

    const theAspirations = await Aspiration.findAll({
      include: [
        { model: Image, attributes: ['id', 'url'] },
        {
          model: User,
          attributes: ['id', 'nama', 'email', 'nik'],
          required: false,
        },
      ],
      limit: parseInt(limit),
      offset: offset,
      where: whereClause,
      order: [[item, orderBy]],
    });
    if (theAspirations === null || !theAspirations) {
      return res.status(404).send('not found');
    }
    const total = await Aspiration.count({
      where: whereClause,
    });
    const response = {
      status_response: true,
      message: 'Daftar aspirasi',
      errors: null,
      data: {
        data: theAspirations,
        total,
        page: parseInt(page),
        per_page: parseInt(limit),
        total_page: Math.ceil(total / limit),
      },
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

exports.updateAspByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { komentar } = req.body;

    const aspiration = await Aspiration.findOne({
      where: { id },
    });

    if (!aspiration) {
      const notFound = {
        status_response: false,
        message: 'Aspirasi tidak di temukan',
        errors: 'Not Found',
        data: null,
      };
      return res.status(404).send(notFound);
    }

    const data = {};

    if (komentar) {
      data.komentar = komentar;
    }

    if (aspiration.status === 'Disampaikan') {
      data.status = 'Diproses';
    } else if (aspiration.status === 'Diproses') {
      data.status = 'Selesai';
    }

    if (!komentar && data.status === 'Selesai' && !aspiration.komentar) {
      const response = {
        status_response: false,
        message: 'Harus menyertakan komentar',
        errors: 'Bad request',
        data: null,
      };
      return res.status(400).send(response);
    }

    await Aspiration.update(data, { where: { id } });

    const updatedAsp = await Aspiration.findOne({
      where: { id },
      include: [{ model: Image, attributes: ['id', 'url'] }],
    });

    const response = {
      status_response: true,
      message: 'Aspirasi berhasil di update',
      errors: null,
      data: updatedAsp,
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

exports.updateAspByUser = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const { judul, deskripsi, lokasi, ditujukan, kategori } = req.body;
    const aspiration = await Aspiration.findOne({
      where: {
        [Op.and]: [{ id }, { user_id: userId }],
      },
    });
    if (!aspiration) {
      const response = {
        status_response: false,
        message: `Aspirasi tidak ditemukan`,
        errors: 'Not found',
        data: null,
      };
      return res.status(404).send(response);
    }
    if (aspiration.status !== 'Disampaikan') {
      const response = {
        status_response: false,
        message: `Hanya bisa mengupdate yang berstatus 'Disampaikan'`,
        errors: 'Not found',
        data: null,
      };
      return res.status(400).send(response);
    }

    const data = {
      judul,
      kategori,
      deskripsi,
      ditujukan,
      lokasi,
    };
    await Aspiration.update(data, {
      where: {
        [Op.and]: [{ id }, { user_id: userId }, { status: 'Disampaikan' }],
      },
    });
    const updatedAsp = await Aspiration.findOne({
      where: {
        [Op.and]: [{ id }, { user_id: userId }, { status: 'Disampaikan' }],
      },
      include: [{ model: Image, attributes: ['id', 'url'] }],
    });
    const response = {
      status_response: true,
      message: 'Aspirasi berhasil di update',
      errors: null,
      data: updatedAsp,
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

exports.deleteAspByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { userRole } = req;
    const aspiration = await Aspiration.findOne({
      where: { id },
      include: [{ model: Image, attributes: ['id', 'url'] }],
    });
    if (!aspiration) {
      const response = {
        status_response: false,
        message: `Aspirasi tidak ditemukan`,
        errors: 'Not found',
        data: null,
      };
      return res.status(404).send(response);
    }
    if (userRole !== 2 && aspiration.user_id !== userId) {
      const response = {
        status_response: false,
        message: `Kamu tidak memiliki akses untuk menghapus`,
        errors: 'Forbidden',
        data: null,
      };
      return res.status(403).send(response);
    }
    if (aspiration.status !== 'Disampaikan') {
      const response = {
        status_response: false,
        message: `Hanya bisa menghapus aspirasi dengan status 'Disampaikan'`,
        errors: 'Bad request',
        data: null,
      };
      return res.status(400).send(response);
    }
    const deletedAsp = await Aspiration.destroy({
      where: {
        [Op.and]: [{ id }, { status: 'Disampaikan' }],
      },
    });
    const images = aspiration.Images;
    for (let i = 0; i < images.length; i++) {
      const splited = images[i].url.split('/')[3];
      const filepath = `./public/${splited}`;
      fs.unlinkSync(filepath);
    }
    const response = {
      status_response: true,
      message: `Aspirasi berhasil dihapus`,
      errors: null,
      data: deletedAsp,
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

exports.getStatPerMount = async (req, res) => {
  try {
    const query = `
  SELECT
    months.month AS month,
    IFNULL(COUNT(Aspirations.id), 0) AS total_aspirations
  FROM
    (SELECT 'January' AS month UNION SELECT 'February' UNION SELECT 'March'
     UNION SELECT 'April' UNION SELECT 'May' UNION SELECT 'June'
     UNION SELECT 'July' UNION SELECT 'August' UNION SELECT 'September'
     UNION SELECT 'October' UNION SELECT 'November' UNION SELECT 'December'
    ) AS months
  LEFT JOIN
    Aspirations ON months.month = DATE_FORMAT(Aspirations.createdAt, '%M')
      AND YEAR(Aspirations.createdAt) = :currentYear
  GROUP BY
    months.month
  ORDER BY
    MONTH(STR_TO_DATE(months.month, '%M'));
`;

    const currentYear = new Date().getFullYear();

    const statistic = await Aspiration.sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
      replacements: { currentYear },
    });
    const month = [];
    const stat = [];
    for (let i = 0; i < statistic.length; i++) {
      month.push(statistic[i].month);
      stat.push(statistic[i].total_aspirations);
    }
    const data = { month, stat };
    const response = {
      status_response: true,
      message: `Statistik aspirasi perbulan`,
      errors: null,
      data,
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

exports.getStatPerWeek = async (req, res) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  try {
    const query = `
    SELECT WeekDates.Week AS week,
       IFNULL(COUNT(Aspirations.id), 0) AS total_aspirations
FROM (
    SELECT 1 AS Week UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
) AS WeekDates
LEFT JOIN Aspirations ON WeekDates.Week = WEEK(Aspirations.createdAt) - WEEK(DATE_SUB(Aspirations.createdAt, INTERVAL DAYOFMONTH(Aspirations.createdAt) - 1 DAY)) + 1
                     AND MONTH(Aspirations.createdAt) = :currentMonth
                     AND YEAR(Aspirations.createdAt) = :currentYear
GROUP BY WeekDates.Week
ORDER BY WeekDates.Week ASC;
    `;

    const statistic = await Aspiration.sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
      replacements: { currentMonth, currentYear },
    });
    const week = [];
    const stat = [];
    for (let i = 0; i < statistic.length; i++) {
      week.push(statistic[i].week);
      stat.push(statistic[i].total_aspirations);
    }
    const data = { week, stat };
    const response = {
      status_response: true,
      message: `Statistik aspirasi perminggu`,
      errors: null,
      data: data,
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
