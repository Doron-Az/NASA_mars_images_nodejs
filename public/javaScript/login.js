(function() {

    const setErrorMsg = (inputElement, msg) => {
        let errorElement = inputElement.nextElementSibling;
        errorElement.innerHTML = msg; // display the error message
        msg === "" ? inputElement.classList.remove("is-invalid") : inputElement.classList.add("is-invalid");
    }

    document.addEventListener('DOMContentLoaded', function() {

        let errMailElement = document.getElementById("errorMsgEmail");
        let errPassEelement = document.getElementById("errorMsgPassword");

        if (errMailElement.value != "")
            setErrorMsg(document.getElementById("emailInput"), errMailElement.value);
        else if (errPassEelement.value != "") {
            setErrorMsg(document.getElementById("passwordInput"), errPassEelement.value);
            document.getElementById("emailInput").value = document.getElementById("emailHidden").value;
        }

        document.getElementById("loginForm").addEventListener("submit", (event) => {

            setErrorMsg(document.getElementById("emailInput"), "");
            setErrorMsg(document.getElementById("passwordInput"), "");

            event.preventDefault();

            const v_email = document.getElementById("emailInput").value.trim() === "";
            const v_password = document.getElementById("passwordInput").value.trim() === "";

            if (v_email)
                setErrorMsg(document.getElementById("emailInput"), "Please fill out this field");
            if (v_password)
                setErrorMsg(document.getElementById("passwordInput"), "Please fill out this field");

            if (!v_email && !v_password)
                document.getElementById("loginForm").submit();

        });
    });
})();