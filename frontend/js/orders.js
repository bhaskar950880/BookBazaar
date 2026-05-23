const token =
    localStorage.getItem("token");

const ordersContainer =
    document.getElementById("ordersContainer");


// FETCH ORDERS

async function fetchOrders() {

    try {

        const response = await fetch(

            "http://localhost:5000/api/orders/myorders",

            {

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }

            }

        );


        const orders =
            await response.json();


        ordersContainer.innerHTML = "";


        // NO ORDERS

        if (orders.length === 0) {

            ordersContainer.innerHTML = `

                <div class="empty-orders">

                    <h3>No Orders Found</h3>

                    <a href="books.html"
                        class="btn btn-primary mt-3">

                        Shop Now

                    </a>

                </div>

            `;

            return;

        }


        // LOOP ORDERS

        orders.forEach(order => {

            let booksHTML = "";


            order.orderItems.forEach(item => {

                booksHTML += `

                    <div class="order-book d-flex align-items-center">

                        <img
                            src="${item.book.image}"
                            class="order-image">


                        <div class="ms-3">

                            <h5>

                                ${item.book.title}

                            </h5>

                            <p>

                                Qty: ${item.quantity}

                            </p>

                            <h6 class="text-primary">

                                ₹${item.book.price}

                            </h6>

                        </div>

                    </div>

                `;

            });


            ordersContainer.innerHTML += `

                <div class="order-card">

                    <div class="d-flex justify-content-between">

                        <div>

                            <h5>

                                Order ID:
                                ${order._id}

                            </h5>

                            <p>

                                ${new Date(
                                    order.createdAt
                                ).toLocaleDateString()}

                            </p>

                        </div>


                        <div>

                            <span class="status-badge">

                                ${order.orderStatus}

                            </span>

                        </div>

                    </div>


                    <hr>

                    ${booksHTML}

                </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}



// INITIAL LOAD

fetchOrders();