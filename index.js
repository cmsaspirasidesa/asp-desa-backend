require('dotenv').config();
const express = require('express');

const db = require('./models');

const app = express();
const port = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
