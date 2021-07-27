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
        const mealMostRatingReq   = await db.query(`SELECT SUM(order_meal_qty) AS 'requested_times' FROM orders_meals WHERE order_meal = ${mealMostRating[0].meal_id}`, { type: QueryTypes.SELECT });
        const totalMealsRequested = await db.query("SELECT SUM(`order_meal_qty`) AS 'total_requested_meals' FROM `orders_meals` WHERE `order_meal_historial` IN (SELECT order_historial_id FROM `orders_historial` WHERE WEEK(`order_historial_date`) = WEEK(NOW()))", { type: QueryTypes.SELECT });
        const totalMealsToday     = await db.query("SELECT SUM(`order_meal_qty`) AS 'total_requested_meals' FROM `orders_meals` WHERE `order_meal_historial` IN (SELECT order_historial_id FROM `orders_historial` WHERE DATE(`order_historial_date`) = CURDATE())", { type: QueryTypes.SELECT });
        const totalOrders         = await db.query("SELECT SUM(`order_historial_amount`) AS 'total_requested_orders', COUNT(`order_historial_id`) as 'total_orders' FROM `orders_historial` WHERE DATE(`order_historial_date`) = CURDATE();", { type: QueryTypes.SELECT });
        const salesByHour         = await db.query("SELECT SUM(`order_historial_amount`) AS 'total_sales', `order_historial_date` FROM `orders_historial` WHERE DATE(`order_historial_date`) = CURDATE() GROUP BY HOUR(`order_historial_date`) ORDER BY `orders_historial`.`order_historial_date` ASC", { type: QueryTypes.SELECT });
        
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
            const formatDate = new Date(order.order_historial_date);
            const date = `${formatDate.getDate()}/${formatDate.getMonth() + 1}/${formatDate.getFullYear()}`;
            const time = `${formatDate.getHours()}:${formatDate.getMinutes()}`;

            const mealsObj = meals.filter( meal => meal.order_meal_historial === order.order_historial_id);
            const mealsStr = [];
            mealsObj.forEach( meal => {
                mealsStr.push(`${meal.order_meal_qty}x ${meal.meal_name}`);
            });

            ordersHistorial.push({
                ...order.dataValues,
                order_historial_date: date,
                order_historial_time: time,
                meals: mealsStr
            });
        });

        // Clean chart data
        const chartData = [];
        salesByHour.forEach( row => {
            const dateFormat = new Date(row.order_historial_date);
            const hourFormat = `${dateFormat.getHours()}:00`;
            chartData.push({
                time: hourFormat,
                amount: row.total_sales
            });
        });

        res.json({
            ok: true,
            data: {
                mealMostRequested: mealMostRequested[0] ? {
                    name: mealMostRequested[0].meal_name,
                    image:mealMostRequested[0].meal_image,
                    times_requested: mealMostRequested[0].requested_times,
                    times_requested_percent: (parseInt(mealMostRequested[0].requested_times)/totalMealsRequested[0].total_requested_meals)*100,
                } : null,
                mealMostRating: mealMostRating[0] ? {
                    name: mealMostRating[0].meal_name,
                    image: mealMostRating[0].meal_image,
                    rating: mealMostRating[0].meal_rating,
                    votes: mealMostRating[0].meal_votes,
                    times_requested: mealMostRatingReq[0].requested_times
                }: null,
                todayOrders: totalMealsToday[0] ? {
                    total_meals: totalMealsToday[0].total_requested_meals,
                    totalSales: totalOrders[0].total_requested_orders,
                    totalOrders: totalOrders[0].total_orders
                }: null,
                ordersHistorial,
                salesByHour: chartData
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

exports.getHistorialOrders = async ( req, res ) => {
    try {
        // Get All orders to show
        const orders = await Orders_historial.findAll({ where: { order_historial_active: 1 }, order: [['order_historial_id', 'DESC']] });
        const meals = await db.query(`SELECT * FROM meals INNER JOIN orders_meals ON meals.meal_id = orders_meals.order_meal`, { type: QueryTypes.SELECT });

        const ordersHistorial = [];

        orders.forEach( order => {
            
            const formatDate = new Date(order.order_historial_date);
            const date = `${formatDate.getDate()}/${formatDate.getMonth() + 1}/${formatDate.getFullYear()}`;
            const time = `${formatDate.getHours()}:${formatDate.getMinutes()}`;

            const mealsObj = meals.filter( meal => meal.order_meal_historial === order.order_historial_id);
            const mealsStr = [];
            mealsObj.forEach( meal => {
                mealsStr.push(`${meal.order_meal_qty}x ${meal.meal_name}`);
            });

            ordersHistorial.push({
                ...order.dataValues,
                order_historial_date: date,
                order_historial_time: time,
                meals: mealsStr
            });

        });

        res.json({
            ok: true,
            data: {
                ordersHistorial
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "There was a problem, try it later"
        });
    }
}

exports.getCharts = async ( req, res ) => {
    try {
        const salesByHourToday = await db.query("SELECT SUM(`order_historial_amount`) AS 'total_sales', COUNT(`order_historial_id`) AS 'orders', `order_historial_date` FROM `orders_historial` WHERE DATE(`order_historial_date`) = CURDATE() GROUP BY HOUR(`order_historial_date`) ORDER BY `orders_historial`.`order_historial_date` ASC;", { type: QueryTypes.SELECT });
        const salesByDayWeek   = await db.query("SELECT SUM(`order_historial_amount`) AS 'total_sales', DAYOFWEEK(`order_historial_date`) AS 'day_week', COUNT(`order_historial_id`) AS 'orders' FROM `orders_historial` WHERE WEEK(`order_historial_date`) = WEEK(NOW()) GROUP BY DAYOFWEEK(`order_historial_date`) ORDER BY `orders_historial`.`order_historial_date` ASC;", { type: QueryTypes.SELECT });
        const salesByDayMonth  = await db.query("SELECT SUM(`order_historial_amount`) AS 'total_sales', DAY(`order_historial_date`) AS 'day_week', MONTH(`order_historial_date`) AS 'month', COUNT(`order_historial_id`) AS 'orders' FROM `orders_historial` WHERE MONTH(`order_historial_date`) = MONTH(NOW()) GROUP BY DAY(`order_historial_date`) ORDER BY `orders_historial`.`order_historial_date` ASC;", { type: QueryTypes.SELECT });
        const salesByYear = await db.query("SELECT SUM(`order_historial_amount`) AS 'total_sales', MONTH(`order_historial_date`) AS 'day_week', COUNT(`order_historial_id`) AS 'orders' FROM `orders_historial` WHERE YEAR(`order_historial_date`) = YEAR(NOW()) GROUP BY MONTH(`order_historial_date`) ORDER BY `orders_historial`.`order_historial_date` ASC;", { type: QueryTypes.SELECT });
        
        const countCatToday    = await db.query("SELECT SUM(orders_meals.order_meal_qty) AS 'category_counter', meals.meal_category, categories.category_name FROM meals INNER JOIN orders_meals ON orders_meals.order_meal = meals.meal_id INNER JOIN categories ON categories.category_id = meals.meal_category WHERE orders_meals.order_meal_historial IN (SELECT `order_historial_id` FROM `orders_historial` WHERE DATE(`order_historial_date`) = CURDATE()) GROUP BY meals.meal_category;", { type: QueryTypes.SELECT });
        const countCatWeek     = await db.query("SELECT SUM(orders_meals.order_meal_qty) AS 'category_counter', meals.meal_category, categories.category_name FROM meals INNER JOIN orders_meals ON orders_meals.order_meal = meals.meal_id INNER JOIN categories ON categories.category_id = meals.meal_category WHERE orders_meals.order_meal_historial IN (SELECT `order_historial_id` FROM `orders_historial` WHERE WEEK(`order_historial_date`) = WEEK(NOW())) GROUP BY meals.meal_category;", { type: QueryTypes.SELECT });
        const countCatMonth    = await db.query("SELECT SUM(orders_meals.order_meal_qty) AS 'category_counter', meals.meal_category, categories.category_name FROM meals INNER JOIN orders_meals ON orders_meals.order_meal = meals.meal_id INNER JOIN categories ON categories.category_id = meals.meal_category WHERE orders_meals.order_meal_historial IN (SELECT `order_historial_id` FROM `orders_historial` WHERE MONTH(`order_historial_date`) = MONTH(NOW())) GROUP BY meals.meal_category;", { type: QueryTypes.SELECT });
        const countCatYear     = await db.query("SELECT SUM(orders_meals.order_meal_qty) AS 'category_counter', meals.meal_category, categories.category_name FROM meals INNER JOIN orders_meals ON orders_meals.order_meal = meals.meal_id INNER JOIN categories ON categories.category_id = meals.meal_category WHERE orders_meals.order_meal_historial IN (SELECT `order_historial_id` FROM `orders_historial` WHERE YEAR(`order_historial_date`) = YEAR(NOW())) GROUP BY meals.meal_category;", { type: QueryTypes.SELECT });

        const daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        // Clean todays chart data 
        const chartDataToday = [];
        salesByHourToday.forEach( row => {
            const dateFormat = new Date(row.order_historial_date);
            const hourFormat = `${dateFormat.getHours()}:00`;
            chartDataToday.push({
                time: hourFormat,
                amount: row.total_sales,
                orders: row.orders
            });
        });

        const chartCatToday = [];
        const chartCatTodayPercent = [];
        let total = 0;
        countCatToday.forEach( row => {
            total += parseInt(row.category_counter);
        });
        countCatToday.forEach( row => {
            chartCatToday.push({
                name: row.category_name,
                value: parseInt(row.category_counter)
            });
            chartCatTodayPercent.push({
                name: row.category_name,
                value: (parseInt(row.category_counter) / total) * 100,
            });
        });

        // Clean week chart data
        const chartDataWeek = [];
        salesByDayWeek.forEach( row => {
            chartDataWeek.push({
                time: daysWeek[row.day_week - 1],
                amount: row.total_sales,
                orders: row.orders
            });
        });

        const chartCatWeek = [];
        const chartCatWeekPercent = [];
        total = 0;
        countCatWeek.forEach( row => {
            total += parseInt(row.category_counter);
        });
        countCatWeek.forEach( row => {
            chartCatWeek.push({
                name: row.category_name,
                value: parseInt(row.category_counter)
            });
            chartCatWeekPercent.push({
                name: row.category_name,
                value: (parseInt(row.category_counter) / total) * 100,
            });
        });

        // Clean month chart data
        const chartDataMonth = [];
        salesByDayMonth.forEach( row => {
            chartDataMonth.push({
                time: `${row.day_week}/${row.month}`,
                amount: row.total_sales,
                orders: row.orders
            });
        });
        
        const chartCatMonth = [];
        const chartCatMonthPercent = [];
        total = 0;
        countCatMonth.forEach( row => {
            total += parseInt(row.category_counter);
        });
        countCatMonth.forEach( row => {
            chartCatMonth.push({
                name: row.category_name,
                value: parseInt(row.category_counter)
            });
            chartCatMonthPercent.push({
                name: row.category_name,
                value: (parseInt(row.category_counter) / total) * 100,
            });
        });
        

        // Clean year chart data
        const chartDataYear = [];
        salesByYear.forEach( row => {
            chartDataYear.push({
                time: months[row.day_week],
                amount: row.total_sales,
                orders: row.orders
            });
        });

        const chartCatYear = [];
        const chartCatYearPercent = [];
        total = 0;
        countCatYear.forEach( row => {
            total += parseInt(row.category_counter);
        });
        countCatYear.forEach( row => {
            chartCatYear.push({
                name: row.category_name,
                value: parseInt(row.category_counter)
            });
            chartCatYearPercent.push({
                name: row.category_name,
                value: (parseInt(row.category_counter) / total) * 100,
            });
        });

        res.json({
            ok: true,
            data: {
                chartDataToday,
                chartDataWeek,
                chartDataMonth,
                chartDataYear,
                chartCatToday : {
                    chartCount: chartCatToday,
                    chartPercent: chartCatTodayPercent
                },
                chartCatWeek: {
                    chartCount: chartCatWeek,
                    chartPercent: chartCatWeekPercent
                },
                chartCatMonth: {
                    chartCount: chartCatMonth,
                    chartPercent: chartCatMonthPercent
                },
                chartCatYear: {
                    chartCount: chartCatYear,
                    chartPercent: chartCatYearPercent
                },
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "There was a problem, try it later"
        })
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
