const express = require("express");
const { check } = require("express-validator");
const categoriesController = require("../controllers/categoriesController");
const router = express.Router();

// api/categories

router.get("/", categoriesController.getCategories);

router.post("/",
    [
        check("category_name", "The name is required").not().isEmpty()
    ],
    categoriesController.addCategory
);

router.put("/:id", 
    [
        check("category_name", "The name is required").not().isEmpty()
    ],
    categoriesController.editCategory
);

router.delete("/:id", categoriesController.removeCategory);

module.exports = router;