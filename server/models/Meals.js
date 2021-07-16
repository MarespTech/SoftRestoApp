const Sequelize = require("sequelize");
const db = require("../config/db");

exports.Meals = db.define("meals", {
    meal_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    meal_name: {
        type: Sequelize.STRING
    },
    meal_cost: {
        type: Sequelize.DOUBLE
    },
    meal_description: {
        type: Sequelize.STRING
    },
    meal_picture: {
        type: Sequelize.STRING
    },
    meal_rating: {
        type: Sequelize.INTEGER
    },
    meal_votes: {
        type: Sequelize.INTEGER
    },
    meal_haVotado: {
        type: Sequelize.INTEGER
    },
    meal_image: {
        type: Sequelize.STRING
    },
    meal_soldout: {
        type: Sequelize.INTEGER,
        default: 0
    },
    meal_active: {
        type: Sequelize.INTEGER,
        default: 1
    },

}, { freezeTableName: true });
