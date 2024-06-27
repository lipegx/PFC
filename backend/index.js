const express = require('express');
const userRoute = require('./src/routes/user.route');
const loginRoute = require('./src/routes/login.route');
const listRoute = require('./src/routes/list.route');
const app = express();
const port = 3000;
const connectDB = require('./src/database/db');
const cors = require('cors');
const checkToken = require('./src/middlewares/user.middlewares');


connectDB();

app.use(cors());
app.use(express.json());
app.use('/auth', userRoute);
app.use('/users', require('./src/routes/user.route'));
app.use('/listUsers', listRoute);
app.use('/posts', checkToken, require ('./src/routes/post.route'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})