function loadRegistrationPage() {

    let rootContainer = document.getElementById("root");
    rootContainer.innerHTML = "";

    let registrationForm = document.createElement("form");
    registrationForm.id = "registrationForm";
    registrationForm.className = "row g-3";

    let registrationHeader = document.createElement("h3");
    registrationHeader.innerText = "Registration";
    registrationForm.appendChild(registrationHeader);

    //Email Input
    let divEmail = document.createElement("div");
    divEmail.className = "col-md-4";

    let emailLabel = document.createElement("label");
    emailLabel.for = "regEmailAddress";
    emailLabel.className = "form-label";
    emailLabel.innerText = "Email Address:";
    divEmail.appendChild(emailLabel);

    let emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.name = "EmailAddress";
    emailInput.className = "form-control";
    emailInput.id = "regEmailAddress";
    emailInput.setAttribute("required", "");
    divEmail.appendChild(emailInput);
    registrationForm.appendChild(divEmail);

    //Username input
    let divUsername = document.createElement("div");
    divUsername.className = "col-md-4";

    let usernameLabel = document.createElement("label");
    usernameLabel.for = "regUsername";
    usernameLabel.className = "form-label";
    usernameLabel.innerText = "Username:";
    divUsername.appendChild(usernameLabel);

    let usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.name = "Username";
    usernameInput.className = "form-control";
    usernameInput.id = "regUsername";
    usernameInput.setAttribute("required", "");
    divUsername.appendChild(usernameInput);
    registrationForm.appendChild(divUsername);

    //FirstName Input
    let divFName = document.createElement("div");
    divFName.className = "col-md-4";

    let firstNameLabel = document.createElement("label");
    firstNameLabel.for = "regFName";
    firstNameLabel.className = "form-label";
    firstNameLabel.innerText = "First Name:";
    divFName.appendChild(firstNameLabel);

    let firstNameInput = document.createElement("input");
    firstNameInput.type = "text";
    firstNameInput.name = "FirstName";
    firstNameInput.className = "form-control";
    firstNameInput.id = "regFName";
    firstNameInput.setAttribute("required", "");
    divFName.appendChild(firstNameInput);
    registrationForm.appendChild(divFName);

    //Last Name Input
    let divLName = document.createElement("div");
    divLName.className = "col-md-4";

    let lastNameLabel = document.createElement("label");
    lastNameLabel.for = "regLastName";
    lastNameLabel.className = "form-label";
    lastNameLabel.innerText = "Last Name:";
    divLName.appendChild(lastNameLabel);

    let lastNameInput = document.createElement("input");
    lastNameInput.type = "text";
    lastNameInput.name = "LastName";
    lastNameInput.className = "form-control";
    lastNameInput.id = "regLastName";
    lastNameInput.setAttribute("required", "");
    divLName.appendChild(lastNameInput);
    registrationForm.appendChild(divLName);

    //Password Input
    let divPassword = document.createElement("div");
    divPassword.className = "col-md-4";

    let passwordLabel = document.createElement("label");
    passwordLabel.for = "regPassword";
    passwordLabel.className = "form-label";
    passwordLabel.innerText = "Password:";
    divPassword.appendChild(passwordLabel);

    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "Password";
    passwordInput.className = "form-control validate";
    passwordInput.id = "regPassword";
    passwordInput.setAttribute("required", "");
    divPassword.appendChild(passwordInput);

    //Confirm Password
    let confirmPasswordLabel = document.createElement("label");
    confirmPasswordLabel.for = "regConfirmPassword";
    confirmPasswordLabel.className = "form-label";
    confirmPasswordLabel.innerText = "Confirm Password:";
    divPassword.appendChild(confirmPasswordLabel);

    let confirmPasswordInput = document.createElement("input");
    confirmPasswordInput.type = "password";
    confirmPasswordInput.name = "ConfirmPassword";
    confirmPasswordInput.className = "form-control";
    confirmPasswordInput.id = "regConfirmPassword";
    confirmPasswordInput.setAttribute("required", "");
     divPassword.appendChild(confirmPasswordInput);
    registrationForm.appendChild(divPassword);

    let submitDiv = document.createElement("div");
    submitDiv.className = "col-12";

    let submitBtn = document.createElement("button");
    submitBtn.className = "btn btn-primary";
    submitBtn.innerText = "Submit";
    submitDiv.appendChild(submitBtn);
    registrationForm.appendChild(submitDiv);
    rootContainer.appendChild(registrationForm);

    registrationForm.addEventListener(
        'submit', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            validateRegistrationInputs();
        }
    );
}

function validateRegistrationInputs() {
    let registrationForm = document.getElementById("registrationForm");
    let registrationDetails = [];

    if (registrationForm["EmailAddress"].value.length > 0 && registrationForm["Username"].value.length > 0 &&
            registrationForm["FirstName"].value.length > 0 && registrationForm["LastName"].value.length > 0 &&
            registrationForm["Password"].value.length > 0 && registrationForm["ConfirmPassword"].value.length > 0 &&
            registrationForm["Password"].value === registrationForm["ConfirmPassword"].value) {
        registrationDetails = {
            "EmailAddress" : registrationForm["EmailAddress"].value,
            "Username": registrationForm["Username"].value,
            "FirstName" : registrationForm["FirstName"].value,
            "LastName" : registrationForm["LastName"].value,
            "Password": registrationForm["Password"].value
        };

        createUser(registrationDetails);
    } else if (registrationForm["Password"].value !== registrationForm["ConfirmPassword"].value) {
        alert("Passwords do not match...");
    } else {
        alert("Please complete all fields!");
    }
}

function createUser(registrationDetails) {
    let data = JSON.stringify({"Action": "createUser", "Data": registrationDetails});

    $.post('api/signup.php', data,
        function (response) {
            if (response) {
                alert("User Created! \nPlease log in with your details");
            } else {
                alert("User not created...")
            }
        })
        .done ( function () {
            let loginFormElement = document.getElementById("root");
            loginFormElement.innerHTML = "";
            pageLoader();
        })
        .fail ( function (error) {
            alert ("Error creating your user...\n" + JSON.stringify(error));
        });
}