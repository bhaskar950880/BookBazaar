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


        // CREATE BOOK

        const book = await Book.create({

            title,
            author,
            description,
            category,
            price,
            stock,
            image,

            // IMPORTANT

            seller: req.user._id

        });


        res.status(201).json(book);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};




// GET ALL BOOKS

const getBooks = async (req, res) => {

    try {

        const keyword =
            req.query.keyword || "";

        const category =
            req.query.category || "";

        const maxPrice =
            Number(req.query.maxPrice) || 5000;


        let query = {

            title: {

                $regex: keyword,
                $options: "i"

            },

            price: {

                $lte: maxPrice

            }

        };


        // CATEGORY FILTER

        if (category) {

            query.category = category;

        }


        const books =
            await Book.find(query);


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

        const book = await Book.findById(

            req.params.id

        );


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

        const book = await Book.findById(

            req.params.id

        );


        if (!book) {

            return res.status(404).json({

                message: "Book Not Found"

            });

        }


        // SECURITY CHECK

        if (

            book.seller.toString() !==
            req.user._id.toString()

        ) {

            return res.status(401).json({

                message:
                    "Not Authorized"

            });

        }


        // UPDATE FIELDS

        book.title =
            req.body.title || book.title;

        book.author =
            req.body.author || book.author;

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


        const updatedBook =
            await book.save();


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

        const book = await Book.findById(

            req.params.id

        );


        if (!book) {

            return res.status(404).json({

                message: "Book Not Found"

            });

        }


        // SECURITY CHECK

        if (

            book.seller.toString() !==
            req.user._id.toString()

        ) {

            return res.status(401).json({

                message:
                    "Not Authorized"

            });

        }


        await book.deleteOne();


        res.json({

            message:
                "Book Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};




// GET SELLER BOOKS

const getSellerBooks = async (req, res) => {

    try {

        const books = await Book.find({

            seller: req.user._id

        });


        res.json(books);

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
    deleteBook,
    getSellerBooks

};