const token =
    localStorage.getItem("token");

const role =
    localStorage.getItem("role");


// PROTECT PAGE

if (!token || role !== "seller") {

    window.location.href =
        "login.html";

}


const sellerBooks =
    document.getElementById("sellerBooks");

const bookForm =
    document.getElementById("bookForm");

const totalBooks =
    document.getElementById("totalBooks");

const totalOrders =
    document.getElementById("totalOrders");

const totalRevenue =
    document.getElementById("totalRevenue");


// FETCH BOOKS

async function fetchSellerBooks() {

    try {

        const response = await fetch(

            "http://localhost:5000/api/books"
        );


        const books =
            await response.json();


        sellerBooks.innerHTML = "";


        totalBooks.innerHTML =
            books.length;


        books.forEach(book => {

            sellerBooks.innerHTML += `

                <div class="col-md-4">

                    <div class="card book-card h-100">

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

                            <h5 class="book-price">

                                ₹${book.price}

                            </h5>

                            <p>

                                Stock: ${book.stock}

                            </p>

                            <button
                                class="btn btn-danger mt-auto"
                                onclick="deleteBook('${book._id}')">

                                Delete

                            </button>

                        </div>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}



// ADD BOOK

bookForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();


        const newBook = {

            title:
                document.getElementById("title").value,

            author:
                document.getElementById("author").value,

            category:
                document.getElementById("category").value,

            price:
                document.getElementById("price").value,

            stock:
                document.getElementById("stock").value,

            image:
                document.getElementById("image").value,

            description:
                document.getElementById("description").value

        };


        try {

            const response = await fetch(

                "http://localhost:5000/api/books",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body: JSON.stringify(newBook)

                }

            );


            if (response.ok) {

                alert("Book Added");

                bookForm.reset();

                fetchSellerBooks();

            }

        } catch (error) {

            console.log(error);

        }

    }
);




// DELETE BOOK

async function deleteBook(bookId) {

    try {

        await fetch(

            `http://localhost:5000/api/books/${bookId}`,

            {

                method: "DELETE",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }

            }

        );


        fetchSellerBooks();

    } catch (error) {

        console.log(error);

    }

}



// FETCH ORDERS

async function fetchSellerOrders() {

    try {

        const response = await fetch(

            "http://localhost:5000/api/orders/seller",

            {

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }

            }

        );


        const orders =
            await response.json();


        totalOrders.innerHTML =
            orders.length;


        let revenue = 0;


        orders.forEach(order => {

            revenue += order.totalPrice;

        });


        totalRevenue.innerHTML =
            `₹${revenue}`;

    } catch (error) {

        console.log(error);

    }

}



// LOGOUT

function logout() {

    localStorage.clear();

    window.location.href =
        "login.html";

}



// INITIAL LOAD

fetchSellerBooks();

fetchSellerOrders();