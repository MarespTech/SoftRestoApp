const { Meals } = require("../models/Meals");
const { validationResult } = require("express-validator");

exports.getMeals = async ( req, res ) => {
    try {
        const meals = await Meals.findAll({ where: { meal_active: 1 }});

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

        meal.meal_active = 0;

        await Meals.update( meal, {
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