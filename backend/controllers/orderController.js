const Order = require("../models/Order");

const Cart = require("../models/Cart");

const Book = require("../models/Book");


// PLACE ORDER

const placeOrder = async (req, res) => {

    try {

        const {

            fullName,
            phone,
            address,
            city,
            postalCode

        } = req.body;


        // GET USER CART

        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.book");


        if (!cart || cart.items.length === 0) {

            return res.status(400).json({
                message: "Cart is Empty"
            });

        }


        // CALCULATE TOTAL

        let totalPrice = 0;

        cart.items.forEach(item => {

            totalPrice +=
                item.book.price * item.quantity;

        });


        // CREATE ORDER

        const order = await Order.create({

            user: req.user._id,

            orderItems: cart.items.map(item => ({
                book: item.book._id,
                quantity: item.quantity
            })),

            shippingAddress: {
                fullName,
                phone,
                address,
                city,
                postalCode
            },

            totalPrice

        });


        // CLEAR CART

        cart.items = [];

        await cart.save();


        res.status(201).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// GET MY ORDERS

const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user._id
        }).populate("orderItems.book");

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// SELLER VIEW ORDERS

const sellerOrders = async (req, res) => {

    try {

        const sellerBooks = await Book.find({
            seller: req.user._id
        });


        const sellerBookIds = sellerBooks.map(
            book => book._id.toString()
        );


        const orders = await Order.find()
            .populate("user", "name email")
            .populate("orderItems.book");


        const sellerOrders = orders.filter(order =>

            order.orderItems.some(item =>

                sellerBookIds.includes(
                    item.book._id.toString()
                )

            )

        );


        res.json(sellerOrders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// UPDATE ORDER STATUS

const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                message: "Order Not Found"
            });

        }


        order.orderStatus =
            req.body.orderStatus || order.orderStatus;

        await order.save();

        res.json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



module.exports = {
    placeOrder,
    getMyOrders,
    sellerOrders,
    updateOrderStatus
};