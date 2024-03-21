const { Sequelize, sequelize } = require('./index');
const ClassUser = require('./class_users');

const Class = sequelize.define('classes', {
    ma_lop: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    ten_lop: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});


module.exports = Class;
