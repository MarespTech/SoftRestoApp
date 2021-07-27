const Sequelize = require("sequelize");
const db = require("../config/db");

exports.Messages = db.define("messages", {
    message_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message_title: {
        type: Sequelize.STRING
    },
    message_body: {
        type: Sequelize.STRING
    },
    message_from: {
        type: Sequelize.STRING
    },
    message_date: {
        type: Sequelize.DATE
    },
    message_seen: {
        type: Sequelize.INTEGER,
        default: 0
    },
    message_seen_date: {
        type: Sequelize.DATE
    },
    message_active: {
        type: Sequelize.INTEGER,
        default: 1
    },
}, { "freezeTableName": true});