const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { Op, QueryTypes } = require("sequelize");
const { Users } = require('../models/Users');
const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({ attributes: {exclude: ['user_password']}, where: { user_active: 1 }});

        res.json({
            ok: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}

exports.getUser = async (req, res) => {
    const user_id = req.params.id;

    try {
        const user = await Users.findOne({ where: { user_id } });

        res.json({
            ok: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
    }
}

exports.createUser = async (req, res) => {
    // Check if there's any error
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    const { user_username, user_email, user_password, user_password_2 } = req.body;

    try {
        // Check if passwords match
        if(user_password !== user_password_2) {
            return res.status(400).json({
                ok: false,
                message: "Passwords don't match"
            });
        }

        // Check if username is already in use
        let user = await Users.findOne({ where: {user_username} });
        if(user) {
            return res.status(400).json({
                ok: false,
                message: `The username '${user_username}' is already in use`
            });
        }

        // Check if email is already in use
        user = await Users.findOne({ where: {user_email} });
        if(user) {
            return res.status(400).json({
                ok: false,
                message: `The email '${user_email}' is already in use`
            });
        }

        user = new Users(req.body); // Create new user

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        user.user_password = await bcryptjs.hash(user_password, salt);
        
        await user.save();

        res.json({
            ok: true,
            data: user,
            message: "User created successfully"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
        console.log(error);
    }
}

exports.editUser = async (req, res) => {
    // Check if there's any error
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    const user_id = req.params.id;
    const { user_email, user_password, user_password_2 } = req.body;

    // Check if exist user with that id
    let user = await Users.findOne({ where: { user_id } });
    if(!user) {
        return res.status(400).json({
            ok: false,
            message: `The user with id ${user_id} doesn't exist`
        });
    }

    // Check if user with new email exist
    user = await Users.findOne({ 
        where: { 
            user_email,
            user_id: {
                [ Op.not ] : user_id
            }
        }
    });

    if(user) {
        return res.status(400).json({
            ok: false,
            message: `The email '${user_email}' is already in use`
        });
    }

    // Check if passwords match
    if(user_password !== user_password_2) {
        return res.status(400).json({
            ok: false,
            message: "Passwords don't match"
        });
    }

    // Hashear password
    const salt = await bcryptjs.genSalt(10);
    req.body.user_password = await bcryptjs.hash(user_password, salt);

    await Users.update( req.body, {
        where: { user_id }
    });

    res.json({
        ok: true,
        message: "User edited successfully",
    });


}

exports.removeUser = async (req, res) => {
    const user_id = req.params.id;

    try {
        let user = await Users.findOne({ where: { user_id } });
        if(!user) {
            return res.status(400).json({
                ok: false,
                message: `User with id ${user_id} doesn't exist`
            });
        }

        user.user_active = 0

        await Users.update(user, { where: { user_id } });

        res.json({
            ok: true,
            message: "User removed successfully"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "There was a problem"
        });
    }
}