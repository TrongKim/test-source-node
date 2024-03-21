const express = require('express');
const { sequelize } = require('./models/index');
const app = express();
var cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

const userRoute = require('./routes/users');
const classRoute = require('./routes/classes');
const testRoute = require('./routes/tests');

app.use('/users', userRoute);
app.use('/classes', classRoute);
app.use('/tests', testRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

sequelize.sync()
  .then(() => {
    console.log('Cơ sở dữ liệu đã được đồng bộ hóa');
  })
  .catch((err) => {
    console.error('Lỗi đồng bộ hóa cơ sở dữ liệu:', err);
  });
