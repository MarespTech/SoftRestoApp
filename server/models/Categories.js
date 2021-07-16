const Sequelize = require("sequelize");
const db = require("../config/db");

exports.Categories = db.define("categories", {
    category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: {
        type: Sequelize.STRING
    },
    category_active: {
        type: Sequelize.INTEGER,
        default: 1
    },

}, { freezeTableName: true });
