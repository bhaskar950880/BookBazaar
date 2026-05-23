const token =
    localStorage.getItem("token");

const role =
    localStorage.getItem("role");


// NAVBAR FUNCTION

function updateNavbar() {

    const navButtons =
        document.getElementById("navButtons");


    if (!navButtons) return;


    // USER LOGGED IN

    if (token) {

        // SELLER

        if (role === "seller") {

            navButtons.innerHTML = `

                <a href="seller-dashboard.html"
                    class="btn btn-light me-2">

                    Dashboard

                </a>

                <button
                    class="btn btn-warning"
                    onclick="logout()">

                    Logout

                </button>

            `;

        }

        // BUYER

        else {

            navButtons.innerHTML = `

                <a href="cart.html"
                    class="btn btn-light me-2">

                    Cart

                </a>

                <button
                    class="btn btn-warning"
                    onclick="logout()">

                    Logout

                </button>

            `;

        }

    }

    // USER NOT LOGGED IN

    else {

        navButtons.innerHTML = `

            <a href="login.html"
                class="btn btn-light me-2">

                Login

            </a>

            <a href="register.html"
                class="btn btn-warning">

                Register

            </a>

        `;

    }

}



// LOGOUT

function logout() {

    localStorage.clear();

    window.location.href =
        "login.html";

}


updateNavbar();