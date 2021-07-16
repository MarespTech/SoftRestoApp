const Sequelize = require("sequelize");
const db = require("../config/db");

exports.Users = db.define("users", {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_username: {
        type: Sequelize.STRING
    },
    user_password: {
        type: Sequelize.STRING
    },
    user_email: {
        type: Sequelize.STRING
    },
    user_first_name: {
        type: Sequelize.STRING
    },
    user_last_name: {
        type: Sequelize.STRING
    },
    user_image: {
        type: Sequelize.STRING
    },
    user_isadmin: {
        type: Sequelize.INTEGER,
        default: 0
    },
    user_active: {
        type: Sequelize.INTEGER,
        default: 1
    },

}, { freezeTableName: true });
