const cartItems =
    document.getElementById("cartItems");

const totalPrice =
    document.getElementById("totalPrice");

const token =
    localStorage.getItem("token");


// FETCH CART

async function fetchCart() {

    try {

        const response = await fetch(

            "http://localhost:5000/api/cart",

            {

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }

            }

        );


        const cart =
            await response.json();


        cartItems.innerHTML = "";


        let total = 0;


        // LOOP ITEMS

        cart.items.forEach(item => {

            total +=
                item.book.price * item.quantity;


            cartItems.innerHTML += `

                <div class="cart-card">

                    <div class="row align-items-center">

                        <div class="col-md-3">

                            <img
                                src="${item.book.image}"
                                class="cart-image">

                        </div>


                        <div class="col-md-6">

                            <h5>

                                ${item.book.title}

                            </h5>

                            <p>

                                ${item.book.author}

                            </p>

                            <h5 class="text-primary">

                                ₹${item.book.price}

                            </h5>

                        </div>


                        <div class="col-md-3">

                            <h6>

                                Qty: ${item.quantity}

                            </h6>

                            <button
                                class="btn btn-danger btn-sm mt-2"
                                onclick="removeItem('${item.book._id}')">

                                Remove

                            </button>

                        </div>

                    </div>

                </div>

            `;

        });


        totalPrice.innerHTML =
            `Total: ₹${total}`;

    } catch (error) {

        console.log(error);

    }

}



// REMOVE ITEM

async function removeItem(bookId) {

    try {

        await fetch(

            `http://localhost:5000/api/cart/${bookId}`,

            {

                method: "DELETE",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }

            }

        );


        fetchCart();

    } catch (error) {

        console.log(error);

    }

}



// INITIAL LOAD

fetchCart();