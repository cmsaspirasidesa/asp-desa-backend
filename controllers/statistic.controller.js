/* eslint-disable no-unused-vars */
const { Op, QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const Aspiration = require('../models').Aspiration;

exports.getStatisticAsp = async (req, res) => {
  try {
    // get last month name
    const [lastMonthName] = await sequelize.query(
      'SELECT DATE_FORMAT(NOW() - INTERVAL 1 MONTH, "%M") AS lastMonthName;',
    );
    // get total aspirations from lastmonth
    const [countLastMonth] = await sequelize.query(
      'SELECT COUNT(*) AS countLastMonth FROM `Aspirations` WHERE MONTH(createdAt) = :lastMonth',
      {
        replacements: {
          type: QueryTypes.SELECT,
          lastMonth: new Date().getMonth(),
        },
      },
    );
    // get last month name
    const [thisMonthName] = await sequelize.query(
      'SELECT MONTHNAME(NOW()) AS thisMonthName;',
    );
    // get total aspirations from lastmonth
    const [countThisMonth] = await sequelize.query(
      'SELECT COUNT(*) AS countThisMonth FROM `Aspirations` WHERE MONTH(createdAt) = MONTH(CURRENT_DATE)',
    );
    // weekly aspirations
    const [weeklyAspirations] = await sequelize.query(
      'SELECT DATE_FORMAT(MIN(`createdAt`), "%Y-%m-%d") AS first_date_of_week, DATE_FORMAT(MAX(`createdAt`), "%Y-%m-%d") AS last_date_of_week, COUNT(*) AS count_of_aspirations FROM `Aspirations` WHERE MONTH(`createdAt`) = MONTH(NOW()) AND YEAR(`createdAt`) = YEAR(NOW()) GROUP BY WEEK(`createdAt`); ',
    );
    const data = {
      lastMonth: lastMonthName[0].lastMonthName,
      totalLastMonth: countLastMonth[0].countLastMonth,
      thisMonth: thisMonthName[0].thisMonthName,
      totalThisMonth: countThisMonth[0].countThisMonth,
      weeklyAspirations: weeklyAspirations,
    };
    res.status(200).send(data);
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
