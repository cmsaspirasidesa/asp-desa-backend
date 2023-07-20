require('dotenv').config();
const express = require('express');
// const db = require('./models');
const authRoute = require('./routes/auth.routes');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(authRoute);

// db.sequelize.sync().then(() => {
app.listen(port, () => console.log(`Server running on port ${port}`));
// });
