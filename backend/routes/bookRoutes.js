const express = require("express");

const router = express.Router();

const {

    addBook,
    getBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    getSellerBooks

} = require("../controllers/bookController");


const {

    protect,
    sellerOnly

} = require("../middleware/authMiddleware");




// SELLER OWN BOOKS

router.get(

    "/seller/mybooks",

    protect,
    sellerOnly,

    getSellerBooks

);




// ADD BOOK

router.post(

    "/",

    protect,
    sellerOnly,

    addBook

);




// GET ALL BOOKS

router.get("/", getBooks);




// GET SINGLE BOOK

router.get("/:id", getSingleBook);




// UPDATE BOOK

router.put(

    "/:id",

    protect,
    sellerOnly,

    updateBook

);




// DELETE BOOK

router.delete(

    "/:id",

    protect,
    sellerOnly,

    deleteBook

);




module.exports = router;