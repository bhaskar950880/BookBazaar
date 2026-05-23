const params =
    new URLSearchParams(window.location.search);

const bookId =
    params.get("id");


// HTML ELEMENTS

const bookImage =
    document.getElementById("bookImage");

const bookTitle =
    document.getElementById("bookTitle");

const bookAuthor =
    document.getElementById("bookAuthor");

const bookPrice =
    document.getElementById("bookPrice");

const bookDescription =
    document.getElementById("bookDescription");

const bookStock =
    document.getElementById("bookStock");

const addCartBtn =
    document.getElementById("addCartBtn");


// FETCH BOOK DETAILS

async function fetchBookDetails() {

    try {

        const response = await fetch(

            `http://localhost:5000/api/books/${bookId}`

        );


        const book =
            await response.json();


        // SET DATA

        bookImage.src =
            book.image;

        bookTitle.innerHTML =
            book.title;

        bookAuthor.innerHTML =
            book.author;

        bookPrice.innerHTML =
            `₹${book.price}`;

        bookDescription.innerHTML =
            book.description;

        bookStock.innerHTML =
            book.stock;

    } catch (error) {

        console.log(error);

    }

}



// ADD TO CART

addCartBtn.addEventListener(
    "click",
    async function () {

        const token =
            localStorage.getItem("token");


        if (!token) {

            alert("Please Login First");

            window.location.href =
                "login.html";

            return;

        }


        try {

            const response = await fetch(

                "http://localhost:5000/api/cart",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        bookId,
                        quantity: 1

                    })

                }

            );


            if (response.ok) {

                alert("Book Added To Cart");

            }

        } catch (error) {

            console.log(error);

        }

    }
);




// INITIAL LOAD

fetchBookDetails();