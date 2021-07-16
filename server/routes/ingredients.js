const express = require("express");
const { check } = require("express-validator");
const ingredientsController = require("../controllers/ingredientsController");
const router = express.Router();


// api/ingredients

router.get("/", ingredientsController.getIngredients);

router.post("/",
    [
        check("ingredient_name", "The name is required").not().isEmpty()
    ],
    ingredientsController.addIngredient
);

router.put("/:id", 
    [
        check("ingredient_name", "The name is required").not().isEmpty()
    ],
    ingredientsController.editIngredient
);

router.delete("/:id", ingredientsController.removeIngredient);

module.exports = router;