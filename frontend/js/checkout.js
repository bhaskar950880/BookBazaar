const token =
    localStorage.getItem("token");

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutForm =
    document.getElementById("checkoutForm");


// FETCH CART

async function loadCheckout() {

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


        let total = 0;


        checkoutItems.innerHTML = "";


        cart.items.forEach(item => {

            total +=
                item.book.price * item.quantity;


            checkoutItems.innerHTML += `

                <div class="mb-3">

                    <h6>

                        ${item.book.title}

                    </h6>

                    <p>

                        Qty: ${item.quantity}

                    </p>

                    <p>

                        ₹${item.book.price}

                    </p>

                </div>

            `;

        });


        checkoutTotal.innerHTML =
            `Total: ₹${total}`;

    } catch (error) {

        console.log(error);

    }

}



// PLACE ORDER

checkoutForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();


        const addressData = {

            fullName:
                document.getElementById("fullName").value,

            phone:
                document.getElementById("phone").value,

            address:
                document.getElementById("address").value,

            city:
                document.getElementById("city").value,

            pincode:
                document.getElementById("pincode").value

        };


        try {

            const response = await fetch(

                "http://localhost:5000/api/orders",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body: JSON.stringify(addressData)

                }

            );


            if (response.ok) {

                alert("Order Placed Successfully");

                window.location.href =
                    "orders.html";

            }

        } catch (error) {

            console.log(error);

        }

    }
);




// INITIAL LOAD

loadCheckout();