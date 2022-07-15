function loadLoginPage() {

    let formContainer = document.getElementById("root");

    let loginForm = document.createElement("form");
    loginForm.className = "row g-3 needs-validation";
    loginForm.id = "loginForm";
    loginForm.setAttribute("novalidate", "");

    let loginHeader = document.createElement("h3");
    loginHeader.innerText = "Log In" ;
    loginForm.appendChild(loginHeader);

    let divEmail = document.createElement("div");
    divEmail.className = "col-md-4";

    let emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.name = "EmailAddress";
    emailInput.className = "form-control";
    emailInput.id = "validationTooltipEmail";
    emailInput.setAttribute("required", "");
    divEmail.appendChild(emailInput);

    let emailLabel = document.createElement("label");
    emailLabel.for = "validationTooltipEmail";
    emailLabel.className = "form-label";
    emailLabel.innerText = "Email";
    divEmail.appendChild(emailLabel);

    let emailValidation = document.createElement("div");
    emailValidation.className = "invalid-feedback";
    emailValidation.innerText = "Please enter a valid email.";
    divEmail.appendChild(emailValidation);
    loginForm.appendChild(divEmail);

    let divPassword = document.createElement("div");
    divPassword.className = "col-md-4";

    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "Password";
    passwordInput.className = "form-control";
    passwordInput.id = "validationTooltipPassword";
    passwordInput.setAttribute("required", "");
    divPassword.appendChild(passwordInput);

    let passwordLabel = document.createElement("label");
    passwordLabel.for = "validationTooltipPassword";
    passwordLabel.className = "form-label";
    passwordLabel.innerText = "Password";
    divPassword.appendChild(passwordLabel);

    let invalidPassword = document.createElement("div");
    invalidPassword.className = "invalid-feedback";
    invalidPassword.innerText = "Please enter a password";
    divPassword.appendChild(invalidPassword);
    loginForm.appendChild(divPassword);

    let submitDiv = document.createElement("div");
    submitDiv.className = "col-12";

    formContainer.appendChild(loginForm);

    let submitBtn = document.createElement("button");
    submitBtn.className = "btn btn-primary";
    submitBtn.innerText = "Submit";
    submitDiv.appendChild(submitBtn);
    formContainer.appendChild(submitDiv);

    loginForm.addEventListener(
        'submit', function(event) {
            if(!loginForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            loginForm.classList.add('was-validated');
        }, false
    );
}