const jwt = require("jsonwebtoken");
const { Users } = require("../models/Users");

exports.authUser = (req, res, next) => {
    // Read token on header
    const token = req.header("x-auth-token");

    // Check if there's token
    if(!token) {
        return res.status(401).json({
            ok: false,
            message: "You don't have permission"
        });
    }

    // validate token
    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        req.user = cifrado.user;

        next();
    } catch (error) {
        res.status(401).json({
            ok: false,
            message: "Token invalid or your session has ended"
        });
        console.log(error);
    }
}

exports.checkLevel = async (req, res, next) => {
    // Read token on header
    const token = req.header("x-auth-token");

    // Check if there's token
    if(!token) {
        return res.status(401).json({
            ok: false,
            message: "You don't have permission"
        });
    }

    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        const { user_id } = cifrado.user;

        const user = await Users.findOne({ where: { user_id } });
        if(user.user_isadmin == 1) {
            next();
        } else {
            res.status(401).json({
                ok: false,
                message: "You don't have permission"
            }); 
        }
    } catch (error) {
        res.status(401).json({
            ok: false,
            message: "Token invalid or your session has ended"
        });
        console.log(error);
    }
}