const { Orders_historial } = require("../models/Orders_historial");
const { Orders_meals } = require("../models/Orders_meals");
const { validationResult } = require("express-validator");
const { Op, QueryTypes } = require("sequelize");
const db = require('../config/db');

exports.getOrdersHistorial = async ( req, res ) => {
    try {
        const orders = await Orders_historial.findAll({ where: { order_historial_active: 1 }});
        const meals = await db.query(`SELECT * FROM meals INNER JOIN orders_meals ON meals.meal_id = orders_meals.order_meal`, { type: QueryTypes.SELECT });

        const ordersHistorial = [];

        orders.forEach( order => {
            
            ordersHistorial.push({
                order,
                meals: meals.filter( meal => meal.order_meal_historial === order.order_historial_id)
            });

        });


        res.json({
            ok: true,
            data: ordersHistorial
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem, try it later"
        });
    }
}

exports.getOrderInfo = async ( req, res ) => {
    const order_historial_id = req.params.id;

    try {
        const orders = await Orders_historial.findAll({ where: { order_historial_id }});
        const meals = await db.query(`SELECT * FROM meals INNER JOIN orders_meals ON meals.meal_id = orders_meals.order_meal WHERE orders_meals.order_meal_historial = ${order_historial_id}`, { type: QueryTypes.SELECT });

        res.json({
            ok: true,
            data: {
                orders,
                meals
            }
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem, try it later"
        });
    }
}

exports.getLastFiveOrders = async ( req, res ) => {
    try {
        const orders = await Orders_historial.findAll({ where: { order_historial_active: 1 }, order: ['order_historial_id', 'DESC'], limit: 5 });
        const meals = await db.query(`SELECT * FROM meals INNER JOIN orders_meals ON meals.meal_id = orders_meals.order_meal WHERE orders_meals.order_meal_historial IN (SELECT order_historial_id FROM orders_historial WHERE order_historial_active = 1 ORDER BY order_historial_id DESC LIMIT 5)`, { type: QueryTypes.SELECT });

        const ordersHistorial = [];

        orders.forEach( order => {
            
            ordersHistorial.push({
                order,
                meals: meals.filter( meal => meal.order_meal_historial === order.order_historial_id)
            });

        });


        res.json({
            ok: true,
            ordersHistorial
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem, try it later"
        });
    }
}

exports.getDashboardData = async ( req, res ) => {

    try {
        const mealMostRequested   = await db.query("SELECT meals.*, `order_meal`, SUM(`order_meal_qty`) AS 'requested_times' FROM `orders_meals` INNER JOIN meals ON meals.meal_id = orders_meals.order_meal WHERE `order_meal_historial` IN (SELECT order_historial_id FROM `orders_historial` WHERE WEEK(`order_historial_date`) = WEEK(NOW())) GROUP BY `order_meal` ORDER BY `requested_times` DESC LIMIT 1", { type: QueryTypes.SELECT });
        const mealMostRating      = await db.query("SELECT * FROM meals ORDER BY meal_rating DESC LIMIT 1", { type: QueryTypes.SELECT });
        const totalMealsRequested = await db.query("SELECT SUM(`order_meal_qty`) AS 'total_requested_meals' FROM `orders_meals` WHERE `order_meal_historial` IN (SELECT order_historial_id FROM `orders_historial` WHERE WEEK(`order_historial_date`) = WEEK(NOW()))", { type: QueryTypes.SELECT });
        const totalMealsToday     = await db.query("SELECT SUM(`order_meal_qty`) AS 'total_requested_meals' FROM `orders_meals` WHERE `order_meal_historial` IN (SELECT order_historial_id FROM `orders_historial` WHERE DATE(`order_historial_date`) = CURDATE())", { type: QueryTypes.SELECT });
        const totalOrders         = await db.query("SELECT SUM(`order_historial_amount`) AS 'total_requested_orders', COUNT(`order_historial_id`) as 'total_orders' FROM `orders_historial` WHERE DATE(`order_historial_date`) = CURDATE();", { type: QueryTypes.SELECT });


        
        // Get last 5 orders to show
        const orders = await Orders_historial.findAll({ where: { order_historial_active: 1 }, order: [['order_historial_id', 'DESC']], limit: 5 });
        let ids = "(";
        orders.forEach( order => {
            ids += `${order.order_historial_id},`
        });

        ids = ids.slice(0, -1) + ')';
        const meals = await db.query(`SELECT * FROM meals INNER JOIN orders_meals ON meals.meal_id = orders_meals.order_meal WHERE orders_meals.order_meal_historial IN (SELECT order_historial_id FROM orders_historial WHERE order_historial_id IN ${ids})`, { type: QueryTypes.SELECT });

        const ordersHistorial = [];

        orders.forEach( order => {
            
            ordersHistorial.push({
                ...order.dataValues,
                meals: meals.filter( meal => meal.order_meal_historial === order.order_historial_id)
            });

        });


        res.json({
            ok: true,
            mealMostRequested: {
                name: mealMostRequested[0].meal_name,
                image: mealMostRequested[0].meal_image,
                times_requested: mealMostRequested[0].requested_times,
                times_requested_percent: (parseInt(mealMostRequested[0].requested_times)/totalMealsRequested[0].total_requested_meals)*100,
            },
            mealMostRating: {
                name: mealMostRating[0].meal_name,
                image: mealMostRating[0].meal_image,
                rating: mealMostRating[0].meal_rating,
                votes: mealMostRating[0].meal_votes,
            },
            todayOrders: {
                total_meals: totalMealsToday[0].total_requested_meals,
                totalSales: totalOrders[0].total_requested_orders,
                totalOrders: totalOrders[0].total_orders
            },
            ordersHistorial
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "There was a problem, try it later"
        });
    }
    
}

exports.addNewOrder = async ( req, res ) => {
    // Check if there's any error
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    try {

        const today = new Date();
        const todayFormat = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;

        const { order_meals } = req.body;

        req.body.order_historial_date = todayFormat;
        const order = await Orders_historial.create(req.body);
        const { order_historial_id } = order;

        const meals = order_meals.map( meal => {
            meal.order_meal_historial = order_historial_id;
            return Orders_meals.create(meal);
        });


        Promise.all(meals)
        .then( async () => {
            const orderMeals = await db.query(`SELECT * FROM meals INNER JOIN orders_meals ON meals.meal_id = orders_meals.order_meal WHERE orders_meals.order_meal_historial = ${order_historial_id}`, { type: QueryTypes.SELECT });
    
            res.json({
                ok: true,
                data: {
                    order,
                    meals: orderMeals
                },
                message: "Order created successfully"
            });
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}

// exports.editOrder = async ( req, res ) => {
// No fkng idea if I'mma do this jeje
// }

exports.removeOrder = async ( req, res ) => {
    let order_historial_id = req.params.id;

    try {
        let order_historial = await Orders_historial.findOne({ where: { order_historial_id }});

        if(!order_historial) {
            res.status(400).json({
                ok: false,
                message: `The Order with id ${order_historial_id} doesn't exist`
            });
        }

        const updateOrder = {
            ...order_historial,
            order_historial_active: 0
        }

        await Orders_historial.update(updateOrder, { where: { order_historial_id }});

        res.json({
            ok: true,
            message: "Order deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem, try it later"
        });
    }
}
