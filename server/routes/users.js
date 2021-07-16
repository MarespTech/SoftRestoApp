const express = require("express");
const { check } = require("express-validator");
const usersControllers = require("../controllers/usersController");
const router = express.Router();

// api/users
router.get("/", usersControllers.getAllUsers);

router.get("/:id", usersControllers.getUser);

router.post("/",
    [
        check('user_username', 'The name is required').not().isEmpty(),
        check('user_first_name', 'The first name is required').not().isEmpty(),
        check('user_last_name', 'The last name is required').not().isEmpty(),
        check('user_email', 'The email is required').isEmail(),
        check('user_password', 'Password has to have at least 6 characters').isLength({ min: 6 }),
        check('user_password_2', 'Password has to have at least 6 characters').isLength({ min: 6 })
    ],
    usersControllers.createUser
);

router.put("/:id", 
    [
        check('user_username', 'The name is required').not().isEmpty(),
        check('user_first_name', 'The first name is required').not().isEmpty(),
        check('user_last_name', 'The last name is required').not().isEmpty(),
        check('user_email', 'The email is required').isEmail(),
        check('user_password', 'Password has to have at least 6 characters').isLength({ min: 6 }),
        check('user_password_2', 'Password has to have at least 6 characters').isLength({ min: 6 })
    ],
    usersControllers.editUser
);

router.delete("/:id", usersControllers.removeUser);

module.exports = router;