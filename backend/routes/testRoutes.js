const express = require("express");

const router = express.Router();

const {
    protect,
    sellerOnly,
    buyerOnly
} = require("../middleware/authMiddleware");


// SELLER ROUTE

router.get(
    "/seller-dashboard",
    protect,
    sellerOnly,
    (req, res) => {

        res.json({
            message: "Welcome Seller Dashboard"
        });

    }
);


// BUYER ROUTE

router.get(
    "/buyer-dashboard",
    protect,
    buyerOnly,
    (req, res) => {

        res.json({
            message: "Welcome Buyer Dashboard"
        });

    }
);


module.exports = router;