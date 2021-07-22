const Sequelize = require("sequelize");
const db = require("../config/db");

exports.Ingredients = db.define("ingredients", {
    ingredient_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ingredient_name: {
        type: Sequelize.STRING
    },
    ingredient_measure: {
        type: Sequelize.STRING
    },
    ingredient_stock: {
        type: Sequelize.INTEGER
    },
    ingredient_min_stock: {
        type: Sequelize.INTEGER
    },
    ingredient_max_stock: {
        type: Sequelize.INTEGER
    },
    ingredient_point_reorder: {
        type: Sequelize.INTEGER
    },
    ingredient_image: {
        type: Sequelize.STRING
    },
    ingredient_active: {
        type: Sequelize.INTEGER,
        default: 1
    },

}, { freezeTableName: true });
