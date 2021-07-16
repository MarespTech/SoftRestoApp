const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { Users } = require("../models/Users");

exports.authenticateUser = async (req, res) => {
    // Check if there's errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    // Extract username and password
    const { user_username, user_password } = req.body;

    try {
        // Check if the user is in database
        let user = await Users.findOne({ where: { user_username } });

        if(!user) {
            return res.status(400).json({
                ok: false,
                message: "User doesn't exist"
            });
        }

        const passCorrect = await bcryptjs.compare(user_password, user.user_password);
        if(!passCorrect) {
            return res.status(400).json({
                ok: false,
                message: "Password incorrect"
            });
        }

        const payload = {
            user: {
                user_id: user.user_id
            }
        }

        // Sign jwt
        jwt.sign(payload, process.env.SECRET, { expiresIn: 172800 }, (error, token) => {
            if(error) throw error;

            res.json({
                ok: true,
                message: "User authenticated succesfully",
                user: {
                    username: user.user_username,
                    name: user.user_first_name + user.user_last_name,
                    photo: user.user_image,
                    isAdmin: user.user_isadmin
                },
                token
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

exports.userAuthenticated = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: { exclude: ['user_password'] },
            where: { user_id: req.user.user_id}
        });

        res.json({
            ok: true,
            user
        });

    } catch (error) {
        json.status(500).json({
            ok: false,
            message: "There was a problem, try it later"
        });
    }
}