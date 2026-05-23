const express = require("express");

const router = express.Router();

const {
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal
} = require("../controllers/cartController");

const {
    protect,
    buyerOnly
} = require("../middleware/authMiddleware");


// ADD TO CART

router.post(
    "/",
    protect,
    buyerOnly,
    addToCart
);


// GET CART

router.get(
    "/",
    protect,
    buyerOnly,
    getCart
);


// REMOVE FROM CART

router.delete(
    "/:bookId",
    protect,
    buyerOnly,
    removeFromCart
);


// UPDATE QUANTITY

router.put(
    "/:bookId",
    protect,
    buyerOnly,
    updateCartQuantity
);


// GET TOTAL PRICE

router.get(
    "/total/price",
    protect,
    buyerOnly,
    getCartTotal
);


module.exports = router;