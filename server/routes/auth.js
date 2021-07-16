const express = require("express");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authController = require("../controllers/authController");
const router = express.Router();

// api/auth
router.post("/",
    [
        check("user_username", "Username is required").not().isEmpty(),
        check("user_password", "Password is required").not().isEmpty(),
        
    ],
    authController.authenticateUser
);

router.get("/", auth.authUser, authController.userAuthenticated);

module.exports = router;