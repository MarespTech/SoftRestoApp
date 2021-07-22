const { Ingredients } = require("../models/Ingredients");
const { validationResult } = require("express-validator");

exports.getIngredients = async ( req, res ) => {
    try {
        const ingredients = await Ingredients.findAll({ where: { ingredient_active: 1 }});

        res.json({
            ok: true,
            data: ingredients,
            message: "Ingredient added successfully"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}

exports.addIngredient = async ( req, res ) => {

    // Check if there's any error
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    // Save in database
    try {
        ingredient = await Ingredients.create(req.body);
    
        res.json({
            ok: true,
            message: "Ingredient added succesfully",
            data: ingredient
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }

}

exports.editIngredient = async ( req, res ) => {

    // Check if there's any error
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    let ingredient_id = req.params.id;

    try {
        
        const ingredient = await Ingredients.findOne({ where: { ingredient_id } });

        if( !ingredient ) {
            return res.status(400).json({
                ok: false,
                message: `Ingredient with id ${ingredient_id} doesn't exist`
            });
        }

        await Ingredients.update( req.body, {
            where: { ingredient_id }
        });

        res.json({
            ok: true,
            message: "Ingredient edited succesfully"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }

}


exports.removeIngredient = async ( req, res ) => {
    let ingredient_id = req.params.id;

    try {
        const ingredient = await Ingredients.findOne({ where: { ingredient_id } });

        if( !ingredient ) {
            return res.status(400).json({
                ok: false,
                message: `Ingredient with id ${ingredient_id} doesn't exist`
            });
        }

        ingredient.ingredient_active = 0;

        await Ingredients.update(ingredient, {
            where: { ingredient_id }
        });

        res.json({
            ok: true,
            message: "Ingredient removed succesfully"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}