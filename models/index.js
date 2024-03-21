const Sequelize = require('sequelize');

const sequelize = new Sequelize('quizzes', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
