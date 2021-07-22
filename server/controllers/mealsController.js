const { Meals } = require("../models/Meals");
const { validationResult } = require("express-validator");
const { Op, QueryTypes } = require("sequelize");
const db = require('../config/db');

exports.getMeals = async ( req, res ) => {
    try {
        const meals = await db.query("SELECT meals.*, categories.category_name FROM `meals` INNER JOIN categories ON meals.meal_category = categories.category_id WHERE meal_active = 1", { type: QueryTypes.SELECT });

        res.json({
            ok: true,
            data: meals,
            message: "Meal added successfully"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}

exports.addMeal = async ( req, res ) => {
    // Check if there's any error
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    try {
        const meal = await Meals.create(req.body);

        res.json({
            ok: true,
            data: meal
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}

exports.editMeal = async ( req, res ) => {
    // Check if there's any error
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    let meal_id = req.params.id;

    try {
        const meal = await Meals.findOne({ where: { meal_id }});

        if( !meal ) {
            return res.status(400).json({
                ok: false,
                message: `Meal with id ${meal_id} doesn't exist`
            });
        }

        const oldImage = meal.meal_image;
        const newImage = req.body.meal_image;

        if(oldImage !== newImage && oldImage !== "/uploads/no-image.jpg") {
            try {
                fs.unlinkSync(`../client/public/${oldImage}`);
            } catch (error) {
                console.log(error);
            }
        }

        await Meals.update( req.body, {
            where: { meal_id }
        });

        res.json({
            ok: true,
            message: "Meal edited succesfully"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}

exports.removeMeal = async ( req, res ) => {
    let meal_id = req.params.id;

    try {
        const meal = await Meals.findOne({ where: { meal_id } });

        if(!meal) {
            return res.status(400).json({
                ok: false,
                message: `Meal with id ${meal_id} doesn't exist`
            });
        }

        const udpateMeal = {
            ...meal,
            meal_active: 0
        }

        await Meals.update( udpateMeal, {
            where: { meal_id }
        });

        res.json({
            ok: true,
            message: "Meal removed succesfully"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}