(function() {

    const setErrorMsg = (inputElement, msg) => {
        let errorElement = inputElement.nextElementSibling;
        errorElement.innerHTML = msg; // display the error message
        inputElement.classList.add("is-invalid");
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
    });

})();