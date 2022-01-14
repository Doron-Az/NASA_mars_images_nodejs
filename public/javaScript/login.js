"use strict";

(function() {
    function viewErrorModal(text) {
        let modal = new bootstrap.Modal(document.getElementById("errorModal"));
        document.getElementById("errorModalText").innerHTML = text;
        modal.show();
    }

    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    const setErrorMsg = (inputElement, msg) => {
        let errorElement = inputElement.parentElement.nextElementSibling;
        errorElement.innerHTML = msg; // display the error message
        msg === "" ? inputElement.classList.remove("is-invalid") : inputElement.classList.add("is-invalid");
    }

    const isNotEmpty = (elemntsList) => {

        let valid = true;

        for (let e of elemntsList)
            if (e.value.trim() === "") {
                setErrorMsg(e, "Please fill out this field");
                valid = false;
            } else
                setErrorMsg(e, "");

        return valid;
    }


    document.addEventListener('DOMContentLoaded', function() {

        const emailInputElement = document.getElementById("emailInput");
        const passwordInputElement = document.getElementById("passwordInput");
        const loadingBufferElement = document.querySelector("#loadingBuffering");


        document.getElementById("loginForm").addEventListener("submit", async(event) => {

            event.preventDefault();

            if (isNotEmpty([emailInputElement, passwordInputElement])) {

                loadingBufferElement.classList.remove("d-none");
                await fetch("/api/resources/verify-user", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            "email": emailInputElement.value.trim().toLowerCase(),
                            "password": passwordInputElement.value
                        })
                    }).then(status)
                    .then(function(response) {
                        return response.json();
                    }).then((data) => {

                        loadingBufferElement.classList.add("d-none");
                        if (data.verify) {
                            localStorage.setItem("auth-token", data.token);
                            document.getElementById("homePageForm").submit();

                        } else {
                            !data.verifyEmail ? setErrorMsg(emailInputElement, "") :
                                setErrorMsg(emailInputElement, data.verifyEmail);

                            !data.verifyPassword ? setErrorMsg(passwordInputElement, "") :
                                setErrorMsg(passwordInputElement, data.verifyPassword);

                        }
                        
                    }).catch(function(error) {
                        //Here we will catch the failure of the connection and handle
                        // it properly, print an error message to the user and ask to refresh the page.
                        // loadingBufferingElement.classList.remove("d-none");
                        console.log('Request failed', error);
                        viewErrorModal("Somthing Worong, please try again");
                    });
            }
        });
    });
})();