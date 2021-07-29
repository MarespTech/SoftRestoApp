const { Messages } = require("../models/Messages");
const { Ingredients } = require("../models/Ingredients");
const { Op, QueryTypes } = require("sequelize");
const db = require('../config/db');

// Mostrar alertas de mensajes
// Mostrar alertas de poco stock en algun ingrediente
// Mostrar alertas de no stock en algun ingrediente

exports.checkMessages = async ( req, res ) => {
    try {
        const messages = await Messages.findAll({ where: { message_active: 1 }});
        const messagesUnseen = await Messages.findAll({ 
            where: { 
                [Op.and]: [{ message_seen: 0 }, 
                           { message_active: 1 }] 
                    } 
        });

        res.json({
            ok: true,
            data: {
                messages,
                messagesUnseen
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "There was a problem, try it later"
        });
    }
}

exports.markMessagesAsSeen = async ( req, res ) => {
    const message_id = req.params.id;
    const today = new Date();
    const todayFormat = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;

    const message = await Messages.findOne({ where: { message_id }});

    if(!message) {
        res.status(400).json({
            ok: false,
            message: `The message with id ${message_id} doesn't exist`
        });
    }

    const updateMessage = {
        ...message,
        message_seen: 1,
        message_seen_date: todayFormat
    }

    await Messages.update( updateMessage, { where: { message_id }});

    const messages = await Messages.findAll({ where: { message_active: 1 }});
    const messagesUnseen = await Messages.findAll({ 
        where: { 
            [Op.and]: [{ message_seen: 0 }, 
                        { message_active: 1 }] 
                } 
    });

    res.json({
        ok: true,
        data: {
            messages,
            messagesUnseen
        }
    });
}

exports.deleteMessage = async ( req, res ) => {
    const message_id = req.params.id;

    const message = await Messages.findOne({ where: { message_id }});

    if(!message) {
        res.status(400).json({
            ok: false,
            message: `The message with id ${message_id} doesn't exist`
        });
    }

    const updateMessage = {
        ...message,
        message_active: 0
    }

    await Messages.update( updateMessage, { where: { message_id }});
    
    const messages = await Messages.findAll({ where: { message_active: 1 }});
    const messagesUnseen = await Messages.findAll({ 
        where: { 
            [Op.and]: [{ message_seen: 0 }, 
                        { message_active: 1 }] 
                } 
    });

    res.json({
        ok: true,
        data: {
            messages,
            messagesUnseen
        },
        message: "Message removed succesfully"
    });
}

exports.checkNotifications = async ( req, res ) => {
    try {
        const ingredientsiLowStock = await db.query("SELECT *, 'is low of stock' AS 'message' FROM `ingredients` WHERE `ingredient_stock` <= `ingredient_min_stock` AND `ingredient_stock` > 0 AND `ingredient_active` = 1;", { type: QueryTypes.SELECT });
        const ingredientsLowReorderPoint = await db.query("SELECT *, 'is low of reorder point' AS 'message' FROM `ingredients` WHERE `ingredient_stock` <= `ingredient_point_reorder` AND `ingredient_stock` > 0 AND `ingredient_active` = 1;", { type: QueryTypes.SELECT });
        const ingredientsNoStock = await db.query("SELECT *, 'is out of stock' AS 'message' FROM `ingredients` WHERE `ingredient_stock` = 0 AND `ingredient_active` = 1;", { type: QueryTypes.SELECT });
        // const ingredientsNoStock = await Ingredients.findAll({ where: { ingredient_stock: 0} });
        
        res.json({
            ok: true,
            data: [
                ...ingredientsiLowStock,
                ...ingredientsNoStock,
                ...ingredientsLowReorderPoint
            ]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "There was a problem, try it later"
        });
    }
}

exports.checkNotificationsForNavbar = async ( req, res ) => {
    try {
        const messagesUnseen = await Messages.findAll({ 
            where: { 
                [Op.and]: [{ message_seen: 0 }, 
                           { message_active: 1 }] 
                    } 
        });
        const ingredientsiLowStock = await db.query("SELECT *, 'is low of stock' AS 'message' FROM `ingredients` WHERE `ingredient_stock` <= `ingredient_min_stock` AND `ingredient_stock` > 0 AND `ingredient_active` = 1;", { type: QueryTypes.SELECT });
        const ingredientsLowReorderPoint = await db.query("SELECT *, 'is low of reorder point' AS 'message' FROM `ingredients` WHERE `ingredient_stock` <= `ingredient_point_reorder` AND `ingredient_stock` > 0 AND `ingredient_active` = 1;", { type: QueryTypes.SELECT });
        const ingredientsNoStock = await db.query("SELECT *, 'is out of stock' AS 'message' FROM `ingredients` WHERE `ingredient_stock` = 0 AND `ingredient_active` = 1;", { type: QueryTypes.SELECT });
        
        res.json({
            ok: true,
            data: {
                notifications: [
                    ...ingredientsiLowStock,
                    ...ingredientsNoStock,
                    ...ingredientsLowReorderPoint
                ],
                messages: messagesUnseen
            }
        });
    } catch (error) {
        console.log(error);
        req.status(500).json({
            ok: false,
            message: "There was a problem, try it later"
        });
    }
}