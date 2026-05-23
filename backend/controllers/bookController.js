const Book = require("../models/Book");


// ADD BOOK

const addBook = async (req, res) => {

    try {

        const {
            title,
            author,
            description,
            category,
            price,
            stock,
            image
        } = req.body;

        const book = await Book.create({

            seller: req.user._id,

            title,
            author,
            description,
            category,
            price,
            stock,
            image

        });

        res.status(201).json(book);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// GET ALL BOOKS + SEARCH + FILTER

const getBooks = async (req, res) => {

    try {

        const keyword = req.query.keyword
            ? {
                $or: [

                    {
                        title: {
                            $regex: req.query.keyword,
                            $options: "i"
                        }
                    },

                    {
                        author: {
                            $regex: req.query.keyword,
                            $options: "i"
                        }
                    }

                ]
            }
            : {};


        const category = req.query.category
            ? {
                category: req.query.category
            }
            : {};


        const minPrice = req.query.minPrice
            ? {
                price: {
                    $gte: Number(req.query.minPrice)
                }
            }
            : {};


        const maxPrice = req.query.maxPrice
            ? {
                price: {
                    ...minPrice.price,
                    $lte: Number(req.query.maxPrice)
                }
            }
            : {};


        const books = await Book.find({

            ...keyword,
            ...category,
            ...maxPrice

        }).populate(
            "seller",
            "name email"
        );


        res.json(books);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// GET SINGLE BOOK

const getSingleBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {

            return res.status(404).json({
                message: "Book Not Found"
            });

        }

        res.json(book);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// UPDATE BOOK

const updateBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {

            return res.status(404).json({
                message: "Book Not Found"
            });

        }

        if (book.seller.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "Not Your Book"
            });

        }

        book.title = req.body.title || book.title;

        book.author = req.body.author || book.author;

        book.description =
            req.body.description || book.description;

        book.category =
            req.body.category || book.category;

        book.price =
            req.body.price || book.price;

        book.stock =
            req.body.stock || book.stock;

        book.image =
            req.body.image || book.image;

        const updatedBook = await book.save();

        res.json(updatedBook);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// DELETE BOOK

const deleteBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {

            return res.status(404).json({
                message: "Book Not Found"
            });

        }

        if (book.seller.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "Not Your Book"
            });

        }

        await book.deleteOne();

        res.json({
            message: "Book Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



module.exports = {
    addBook,
    getBooks,
    getSingleBook,
    updateBook,
    deleteBook
};