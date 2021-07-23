const express = require("express");
const { check } = require("express-validator");
const ordersController = require("../controllers/ordersController");
const router = express.Router();

// api/orders

router.get("/", ordersController.getOrdersHistorial);

router.get("/getOrderInfo/:id", ordersController.getOrderInfo);

router.get("/fiveLastOrders", ordersController.getLastFiveOrders);

router.get("/dashboardData", ordersController.getDashboardData);

router.post("/",
    [
        check("order_historial_payment", "The payment method is required").not().isEmpty(),
        check("order_historial_amount", "The total amount is required").not().isEmpty(),
        check("order_meals", "At least one item is required").isLength({ min: 1 })
    ],
    ordersController.addNewOrder
);

router.delete("/:id", ordersController.removeOrder);


module.exports = router;