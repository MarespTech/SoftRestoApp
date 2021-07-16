const express = require("express");
const { check } = require("express-validator");
const mealsController = require("../controllers/mealsController");
const router = express.Router();

// api/meals

router.get("/", mealsController.getMeals);

router.post("/",
    [
        check("meal_name", "The name is required").not().isEmpty(),
        check("meal_cost", "The cost is required").not().isEmpty(),
        check("meal_description", "The description is required").not().isEmpty(),
    ],
    mealsController.addMeal
);

router.put("/:id", 
    [
        check("meal_name", "The name is required").not().isEmpty(),
        check("meal_cost", "The cost is required").not().isEmpty(),
        check("meal_description", "The description is required").not().isEmpty(),
    ],
    mealsController.editMeal
);

router.delete("/:id", mealsController.removeMeal);

module.exports = router;