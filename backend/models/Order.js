const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    orderItems: [

        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true
            },

            quantity: {
                type: Number,
                required: true
            }
        }

    ],

    shippingAddress: {

        fullName: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        postalCode: {
            type: String,
            required: true
        }

    },

    totalPrice: {
        type: Number,
        required: true
    },

    orderStatus: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered"],
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);