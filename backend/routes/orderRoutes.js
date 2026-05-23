const express = require("express");

const router = express.Router();

const {
    placeOrder,
    getMyOrders,
    sellerOrders,
    updateOrderStatus
} = require("../controllers/orderController");

const {
    protect,
    buyerOnly,
    sellerOnly
} = require("../middleware/authMiddleware");


// PLACE ORDER

router.post(
    "/",
    protect,
    buyerOnly,
    placeOrder
);


// GET MY ORDERS

router.get(
    "/my-orders",
    protect,
    buyerOnly,
    getMyOrders
);


// SELLER VIEW ORDERS

router.get(
    "/seller",
    protect,
    sellerOnly,
    sellerOrders
);


// UPDATE ORDER STATUS

router.put(
    "/:id",
    protect,
    sellerOnly,
    updateOrderStatus
);


module.exports = router;