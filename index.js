require('dotenv').config();
const express = require('express');
const { urlencoded } = express;
// const db = require('./models');
const authRoute = require('./routes/auth.routes');
const userRoute = require('./routes/user.routes');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(authRoute);
app.use(userRoute);

// db.sequelize.sync().then(() => {
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));
// });
