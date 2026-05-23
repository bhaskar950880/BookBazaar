const booksContainer =
    document.getElementById("booksContainer");

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const categoryFilters =
    document.querySelectorAll(".categoryFilter");

const priceRange =
    document.getElementById("priceRange");

const priceValue =
    document.getElementById("priceValue");


// FILTER VALUES

let selectedCategory = "";

let selectedPrice = 5000;


// FETCH BOOKS

async function fetchBooks(keyword = "") {

    try {

        const response = await fetch(

            `http://localhost:5000/api/books?keyword=${keyword}&category=${selectedCategory}&maxPrice=${selectedPrice}`

        );


        const books =
            await response.json();


        booksContainer.innerHTML = "";


        // NO BOOKS

        if (books.length === 0) {

            booksContainer.innerHTML = `

                <div class="text-center mt-5">

                    <h3>No Books Found</h3>

                </div>

            `;

            return;

        }


        // LOOP BOOKS

        books.forEach(book => {

            booksContainer.innerHTML += `

                <div class="col-md-4">

                    <div class="card book-card h-100">

                        <div class="discount-badge">

                            20% OFF

                        </div>


                        <img
                            src="${book.image}"
                            class="card-img-top book-image">


                        <div class="card-body d-flex flex-column">

                            <h5 class="book-title">

                                ${book.title}

                            </h5>

                            <p class="book-author">

                                ${book.author}

                            </p>


                            <div class="rating-box mb-2">

                                ⭐ 4.7

                            </div>


                            <h5 class="book-price">

                                ₹${book.price}

                            </h5>


                            <p class="text-success">

                                In Stock: ${book.stock}

                            </p>


                            <div class="mt-auto">

                                <a href="book-details.html?id=${book._id}"
                                    class="btn btn-primary w-100 mb-2">

                                    View Details

                                </a>


                                <button
                                    class="btn btn-warning w-100"
                                    onclick="addToCart('${book._id}')">

                                    Add To Cart

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}



// SEARCH

searchForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        fetchBooks(searchInput.value);

    }
);




// CATEGORY FILTER

categoryFilters.forEach(filter => {

    filter.addEventListener(
        "change",
        function () {

            selectedCategory =
                this.value;

            fetchBooks(
                searchInput.value
            );

        }
    );

});




// PRICE FILTER

priceRange.addEventListener(
    "input",
    function () {

        selectedPrice =
            this.value;

        priceValue.innerHTML =
            selectedPrice;

        fetchBooks(
            searchInput.value
        );

    }
);




// ADD TO CART

async function addToCart(bookId) {

    const token =
        localStorage.getItem("token");

    const role =
        localStorage.getItem("role");


    if (!token) {

        alert("Please Login First");

        window.location.href =
            "login.html";

        return;

    }


    if (role === "seller") {

        alert("Seller cannot add books");

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



// INITIAL LOAD

fetchBooks();