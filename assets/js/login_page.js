function loadLoginPage() {
    let rootContainer = document.getElementById("root");
    rootContainer.innerHTML = "";

    let cardWrapper = document.createElement("div");
    cardWrapper.id = "logInCardWrapper";
    cardWrapper.className = "row g-3 justify-content-center";

    let cardDiv = document.createElement("div");
    cardDiv.className = "card text-center";
    cardDiv.id = "profileCard";
    cardWrapper.appendChild(cardDiv);

    let cardHeader = document.createElement("h5");
    cardHeader.className = "card-header";
    cardHeader.innerText = "Log In";
    cardDiv.appendChild(cardHeader);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let loginForm = document.createElement("form");
    loginForm.id = "loginForm";
    loginForm.className = "row g-3 justify-content-center";

    let divUsername = document.createElement("div");
    divUsername.className = "col-md-10";
    divUsername.id = "inputDiv";

    let usernameLabel = document.createElement("label");
    usernameLabel.for = "validationTooltip01";
    usernameLabel.className = "form-label";
    usernameLabel.innerText = "Username";
    divUsername.appendChild(usernameLabel);

    let usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.name = "Username";
    usernameInput.className = "form-control";
    usernameInput.id = "validationTooltip01";
    usernameInput.setAttribute("required", "");
    divUsername.appendChild(usernameInput);
    loginForm.appendChild(divUsername);

    let divPassword = document.createElement("div");
    divPassword.className = "col-md-10";
    divPassword.id = "inputDiv";

    let passwordLabel = document.createElement("label");
    passwordLabel.for = "validationTooltipPassword";
    passwordLabel.className = "form-label";
    passwordLabel.innerText = "Password";
    divPassword.appendChild(passwordLabel);

    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "Password";
    passwordInput.className = "form-control";
    passwordInput.id = "validationTooltipPassword";
    passwordInput.setAttribute("required", "");
    divPassword.appendChild(passwordInput);
    loginForm.appendChild(divPassword);

    let submitDiv = document.createElement("div");
    submitDiv.className = "col-md-10 justify-content-center";
    submitDiv.id = "btnDiv";

    let submitBtn = document.createElement("button");
    submitBtn.className = "btn btn-primary";
    submitBtn.innerText = "Submit";
    submitDiv.appendChild(submitBtn);
    loginForm.appendChild(submitDiv);

    cardBody.appendChild(loginForm);
    cardDiv.appendChild(cardBody);
    rootContainer.appendChild(cardWrapper);

    loginForm.addEventListener(
        'submit', function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            validateLoginInputs();
        }
    );

    let registerBtn = document.createElement("p");
    registerBtn.id = "registerLink";
    registerBtn.innerText = "Don't have an account? Signup here!";
    registerBtn.addEventListener(
        'click', () => {
            loadRegistrationPage();
        }
    );
    loginForm.appendChild(registerBtn);
}

function validateLoginInputs() {
    let loginForm = document.getElementById("loginForm");
    let loginDetails = [];

    if (loginForm["Username"].value.length > 0 && loginForm["Password"].value.length > 0) {
        loginDetails = {
                "Username": loginForm["Username"].value,
                "Password": loginForm["Password"].value
        };

        validateLogin(loginDetails);

    } else {
        Swal.fire("Error:", "Please enter your Username and Password!", "error");
    }
}

function validateLogin(loginCredentials){
    let requestArray = JSON.stringify({
        "Action": "logIn",
        "Data": loginCredentials,
        "Session": sessionStorage.getItem('sessionID')
    });

    $.post('api/login.php', requestArray, function(data){
            if (data) {
                console.log(data);
                pageLoader();
            } else {
                Swal.fire("Invalid login details", "", "error");
            }
        })
        .fail(function () {
            Swal.fire(
                "Error:",
                "Failed to log in",
                "error"
            );
        });
}

function logout() {
    console.log("Here");
    let requestData = {
        "Action": "logOut",
        "Data": ""
    };

    $.post("api/login.php", JSON.stringify(requestData),
        function (data) {
            if (data) {
                setTimeout("location.reload()", 1);
            }
        });
}