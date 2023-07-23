require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { urlencoded } = express;
// const db = require('./models');
const authRoute = require('./routes/auth.routes');
const userRoute = require('./routes/user.routes');
const tokenRoute = require('./routes/token.routes');

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    credentials: true,
    origin: ['*'],
  }),
);
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(authRoute);
app.use(userRoute);
app.use(tokenRoute);

// db.sequelize.sync().then(() => {
app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`),
);
// });
