const Sequelize = require("sequelize");
const db = require("../config/db");

exports.Orders_historial = db.define("orders_historial", {
    order_historial_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_historial_date: {
        type: Sequelize.STRING,
    },
    order_historial_payment: {
        type: Sequelize.STRING
    },
    order_historial_amount: {
        type: Sequelize.DOUBLE
    },
    order_historial_active: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
    
}, { freezeTableName: true });