const Cart = require("../models/Cart");

const Book = require("../models/Book");


// ADD TO CART

const addToCart = async (req, res) => {

    try {

        const { bookId, quantity } = req.body;

        const book = await Book.findById(bookId);

        if (!book) {

            return res.status(404).json({
                message: "Book Not Found"
            });

        }


        let cart = await Cart.findOne({
            user: req.user._id
        });


        // CREATE NEW CART

        if (!cart) {

            cart = await Cart.create({

                user: req.user._id,

                items: [
                    {
                        book: bookId,
                        quantity
                    }
                ]

            });

        } else {

            // CHECK IF BOOK EXISTS

            const itemIndex = cart.items.findIndex(

                item =>
                    item.book.toString() === bookId
            );


            if (itemIndex > -1) {

                // UPDATE QUANTITY

                cart.items[itemIndex].quantity += quantity;

            } else {

                // ADD NEW ITEM

                cart.items.push({
                    book: bookId,
                    quantity
                });

            }

            await cart.save();

        }

        res.json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// GET USER CART

const getCart = async (req, res) => {

    try {

        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.book");

        if (!cart) {

            return res.json({
                items: []
            });

        }

        res.json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// REMOVE FROM CART

const removeFromCart = async (req, res) => {

    try {

        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {

            return res.status(404).json({
                message: "Cart Not Found"
            });

        }


        // REMOVE ITEM

        cart.items = cart.items.filter(

            item =>
                item.book.toString() !== req.params.bookId
        );


        await cart.save();

        res.json({
            message: "Item Removed From Cart",
            cart
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// UPDATE CART QUANTITY

const updateCartQuantity = async (req, res) => {

    try {

        const { quantity } = req.body;

        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {

            return res.status(404).json({
                message: "Cart Not Found"
            });

        }


        const item = cart.items.find(

            item =>
                item.book.toString() === req.params.bookId
        );


        if (!item) {

            return res.status(404).json({
                message: "Item Not Found"
            });

        }


        item.quantity = quantity;

        await cart.save();

        res.json({
            message: "Quantity Updated",
            cart
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// GET TOTAL PRICE

const getCartTotal = async (req, res) => {

    try {

        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.book");


        if (!cart) {

            return res.json({
                totalPrice: 0
            });

        }


        let totalPrice = 0;


        cart.items.forEach(item => {

            totalPrice +=
                item.book.price * item.quantity;

        });


        res.json({
            totalPrice
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal
};