// LOGIN

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const email =
                document.getElementById("email").value;

            const password =
                document.getElementById("password").value;


            try {

                const response = await fetch(

                    "http://localhost:5000/api/auth/login",

                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            email,
                            password
                        })
                    }

                );


                const data =
                    await response.json();


                const message =
                    document.getElementById("message");


                if (response.ok) {

                    message.innerHTML =
                        "Login Successful";

                    message.style.color = "green";


                    // SAVE TOKEN

                    localStorage.setItem(
                        "token",
                        data.token
                    );


                    localStorage.setItem(
                        "role",
                        data.role
                    );


                    // REDIRECT

                    setTimeout(() => {

                        if (data.role === "seller") {

                            window.location.href =
                                "seller-dashboard.html";

                        } else {

                            window.location.href =
                                "index.html";

                        }

                    }, 1000);

                } else {

                    message.innerHTML =
                        data.message;

                    message.style.color = "red";

                }

            } catch (error) {

                console.log(error);

            }

        }
    );

}



// REGISTER

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const name =
                document.getElementById("name").value;

            const email =
                document.getElementById("email").value;

            const password =
                document.getElementById("password").value;

            const role =
                document.getElementById("role").value;


            try {

                const response = await fetch(

                    "http://localhost:5000/api/auth/register",

                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            name,
                            email,
                            password,
                            role
                        })
                    }

                );


                const data =
                    await response.json();


                const message =
                    document.getElementById("message");


                if (response.ok) {

                    message.innerHTML =
                        "Registration Successful";

                    message.style.color = "green";


                    // SAVE TOKEN

                    localStorage.setItem(
                        "token",
                        data.token
                    );


                    localStorage.setItem(
                        "role",
                        data.role
                    );


                    // REDIRECT

                    setTimeout(() => {

                        if (data.role === "seller") {

                            window.location.href =
                                "seller-dashboard.html";

                        } else {

                            window.location.href =
                                "index.html";

                        }

                    }, 1000);

                } else {

                    message.innerHTML =
                        data.message;

                    message.style.color = "red";

                }

            } catch (error) {

                console.log(error);

            }

        }
    );

}