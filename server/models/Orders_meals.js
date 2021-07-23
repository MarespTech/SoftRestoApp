const Sequelize = require("sequelize");
const db = require("../config/db");

exports.Orders_meals = db.define("orders_meals", {
    order_meal_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_meal_historial: {
        type: Sequelize.INTEGER
    },
    order_meal_qty: {
        type: Sequelize.INTEGER
    },
    order_meal: {
        type: Sequelize.INTEGER
    }
}, { freezeTableName: true });