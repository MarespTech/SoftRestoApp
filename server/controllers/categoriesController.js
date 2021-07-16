const { Categories } = require("../models/Categories");
const { validationResult } = require("express-validator");

exports.getCategories = async ( req, res ) => {
    try {
        const categories = await Categories.findAll({ where: { category_active: 1 }});

        res.json({
            ok: true,
            data: categories
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}

exports.addCategory = async ( req, res ) => {
    // Check if there's any error
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    try {
        category = await Categories.create(req.body);

        res.json({
            ok: true,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}

exports.editCategory = async ( req, res ) => {
    // Check if there's any error
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    let category_id = req.params.id;

    try {
        const category = await Categories.findOne({ where: { category_id } });

        if( !category ) {
            return res.status(400).json({
                ok: false,
                message: `Category with id ${category_id} doesn't exist`
            });
        }

        await Categories.update( req.body, {
            where: { category_id }
        });

        res.json({
            ok: true,
            message: "Category edited succesfully"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}

exports.removeCategory = async ( req, res ) => {
    let category_id = req.params.id;

    try {
        const category = await Categories.findOne({ where: { category_id } });

        if( !category ) {
            return res.status(400).json({
                ok: false,
                message: `Category with id ${category_id} doesn't exist`
            });
        }

        category.category_active = 0;

        const newCategory = {
            ...category,
            category_active: 0
        }

        await Categories.update(newCategory, {
            where: { category_id }
        });

        res.json({
            ok: true,
            message: "Category removed succesfully",
            data: newCategory
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}


