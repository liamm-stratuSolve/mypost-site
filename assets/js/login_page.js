function loadLoginPage() {
    let formContainer = document.getElementById("root");

    let loginForm = document.createElement("form");
    loginForm.id = "loginForm";
    loginForm.className = "row g-3";

    let loginHeader = document.createElement("h3");
    loginHeader.innerText = "Log In" ;
    loginForm.appendChild(loginHeader);

    let divUsername = document.createElement("div");
    divUsername.className = "col-md-4";

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
    divPassword.className = "col-md-4";

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
    submitDiv.className = "col-12";

    let submitBtn = document.createElement("button");
    submitBtn.className = "btn btn-primary";
    submitBtn.innerText = "Submit";
    submitDiv.appendChild(submitBtn);
    loginForm.appendChild(submitDiv);
    formContainer.appendChild(loginForm);

    loginForm.addEventListener(
        'submit', function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            validateLoginInputs();
        }
    );

    let registerBtn = document.createElement("p");
    registerBtn.className = "Register link";
    registerBtn.innerText = "Don't have an account? Signup here!";
    registerBtn.addEventListener(
        'click', () => {
            loadRegistrationPage();
        }
    );

    formContainer.appendChild(registerBtn);

}

function validateLoginInputs() {
    let loginForm = document.getElementById("loginForm");
    let loginDetails = [];
    let username = "";
    let password = "";

    if (loginForm["Username"].value.length > 0 && loginForm["Password"].value.length > 0) {
        username = loginForm["Username"].value;
        password = loginForm["Password"].value;

        loginDetails = {
            "Username": username,
            "Password": password
        };

        validateLogin(loginDetails);
    } else {
        alert("Please enter your email and password!");
    }
}

function validateLogin(loginCredentials){
    let username = loginCredentials["Username"];
    let requestArray = JSON.stringify({"Action": "logIn", "Data": loginCredentials});

    $.post('./api/login.php', requestArray)
        .done(function(data){
            if (data) {
                sessionStorage.setItem('status', 'loggedIn');
                sessionStorage.setItem('Username', username);

                let loginFormElement = document.getElementById("root");
                loginFormElement.innerHTML = "";
                pageLoader();
            } else {
                alert("Invalid login details");
            }
        })
        .fail(function () {
                alert("Failed to log in");
        });
}