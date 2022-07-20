function loadProfile() {
    let RequestArr = JSON.stringify({"Action": "loadUser", "Data": ""});

    $.post("api/signup.php", RequestArr,
        function (data) {
            if (data) {
                let userDetails = JSON.parse(data);
                generateProfilePage(userDetails[0]);
            } else {
                Swal.fire("Error", "Error loading profile", "error");
                loadHomePage();
            }
        });
}

function generateProfilePage(userDetails) {
    let rootDiv = document.getElementById("root");
    rootDiv.innerHTML = "";
    generateProfileNavbar();
    generateProfileForm(userDetails);
}

function generateProfileNavbar() {
    let rootDiv = document.getElementById("root");

    let navBar = document.createElement("nav");
    navBar.id = "profileNav";
    navBar.className = "nav fixed-top nav-pills nav-fill";

    let navTitle = document.createElement("h1");
    navTitle.innerText = "MyPost";
    navTitle.className = "nav-item boldHeading";
    navTitle.id = "navHeaderTitle";
    navBar.appendChild(navTitle);

    let navItemProfile = document.createElement("a");
    navItemProfile.className = "nav-item nav-link offset-5";
    navItemProfile.innerText = "Back to Homepage";
    navItemProfile.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();
            $("#root").innerHTML = "";
            pageLoader();
        }
    );
    navBar.appendChild(navItemProfile);

    let navItemLogout = document.createElement("a");
    navItemLogout.className = "nav-item nav-link navLogout";
    navItemLogout.innerText = "Log Out";
    navItemLogout.addEventListener(
        'click', () => {
            logout();
        }
    );
    navBar.appendChild(navItemLogout);


    rootDiv.appendChild(navBar);

}

function generateProfileForm(userDetails) {
    let rootContainer = document.getElementById("root");

    let cardWrapper = document.createElement("div");
    cardWrapper.id = "cardWrapper";
    cardWrapper.className = "row g-3";

    let cardDiv = document.createElement("div");
    cardDiv.className = "card justify-content-start";
    cardDiv.id = "profileCard";
    cardWrapper.appendChild(cardDiv);

    let cardHeader = document.createElement("h5");
    cardHeader.className = "card-header";
    cardHeader.innerText = "Your Account Details:";
    cardDiv.appendChild(cardHeader);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.id = "cardBody";

    let profileForm = document.createElement("form");
    profileForm.id = "profileForm";
    profileForm.className = "row g-3 justify-content-center";

    //Username input
    let divUsername = document.createElement("div");
    divUsername.className = "col-md-10 text-left";

    let usernameLabel = document.createElement("label");
    usernameLabel.for = "profileUsername";
    usernameLabel.className = "form-label";
    usernameLabel.innerText = "Username:";
    divUsername.appendChild(usernameLabel);

    let usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.name = "Username";
    usernameInput.className = "form-control";
    usernameInput.id = "profileUsername";
    usernameInput.value = userDetails["Username"];
    usernameInput.setAttribute("readonly", "");
    usernameInput.setAttribute("required", "");
    divUsername.appendChild(usernameInput);
    profileForm.appendChild(divUsername);

    //Email Input
    let divEmail = document.createElement("div");
    divEmail.className = "col-md-10 text-left";

    let emailLabel = document.createElement("label");
    emailLabel.for = "profileEmailAddress";
    emailLabel.className = "form-label";
    emailLabel.innerText = "Email Address:";
    divEmail.appendChild(emailLabel);

    let emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.name = "EmailAddress";
    emailInput.className = "form-control";
    emailInput.id = "profileEmailAddress";
    emailInput.value = userDetails["Email"];
    emailInput.setAttribute("readonly", "");
    emailInput.setAttribute("required", "");
    divEmail.appendChild(emailInput);
    profileForm.appendChild(divEmail);

    //FirstName Input
    let divFName = document.createElement("div");
    divFName.className = "col-md-10 text-left";

    let firstNameLabel = document.createElement("label");
    firstNameLabel.for = "profileFName";
    firstNameLabel.className = "form-label";
    firstNameLabel.innerText = "First Name:";
    divFName.appendChild(firstNameLabel);

    let firstNameInput = document.createElement("input");
    firstNameInput.type = "text";
    firstNameInput.name = "FirstName";
    firstNameInput.className = "form-control";
    firstNameInput.id = "profileFName";
    firstNameInput.value = userDetails["FirstName"];
    firstNameInput.setAttribute("readonly", "");
    firstNameInput.setAttribute("required", "");
    divFName.appendChild(firstNameInput);
    profileForm.appendChild(divFName);

    //Last Name Input
    let divLName = document.createElement("div");
    divLName.className = "col-md-10 ";

    let lastNameLabel = document.createElement("label");
    lastNameLabel.for = "profileLastName";
    lastNameLabel.className = "form-label";
    lastNameLabel.innerText = "Last Name:";
    divLName.appendChild(lastNameLabel);

    let lastNameInput = document.createElement("input");
    lastNameInput.type = "text";
    lastNameInput.name = "LastName";
    lastNameInput.className = "form-control";
    lastNameInput.id = "profileLastName";
    lastNameInput.value = userDetails["LastName"];
    lastNameInput.setAttribute("readonly", "");
    lastNameInput.setAttribute("required", "");
    divLName.appendChild(lastNameInput);
    profileForm.appendChild(divLName);

    let editBtnDiv = document.createElement("div");
    editBtnDiv.className = "col-md-10 text-center";
    editBtnDiv.id = "btnDiv";

    let editBtn = document.createElement("button");
    editBtn.className = "btn btn-secondary";
    editBtn.id = "profileEditBtn"
    editBtn.innerText = "Edit Details";
    editBtnDiv.appendChild(editBtn);

    editBtn.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();
            editableProfileForm();
        }
    );

    let changePasswordBtn = document.createElement("button");
    changePasswordBtn.className = "btn btn-secondary offset-2";
    changePasswordBtn.id = "passwordChangeBtn"
    changePasswordBtn.innerText = "Change Password";
    editBtnDiv.appendChild(changePasswordBtn);
    profileForm.appendChild(editBtnDiv);

    changePasswordBtn.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();
            generatePasswordForm();
        }
    );

    cardBody.appendChild(profileForm);
    cardDiv.appendChild(cardBody);
    rootContainer.appendChild(cardWrapper);
}

function editableProfileForm() {

    let pssWordBtn = document.getElementById("passwordChangeBtn");
    if (pssWordBtn) {
        pssWordBtn.remove();
    }

    let editBtn = document.getElementById("profileEditBtn");
    if(editBtn) {
        editBtn.remove();
    }

    let subBtn = document.getElementById("profileSubmitBtn");
    if(subBtn){
        subBtn.remove();
    }

    let cnclBtn = document.getElementById("profileCancelBtn");
    if (cnclBtn) {
        cnclBtn.remove();
    }
    let username = document.getElementById("profileUsername");
    username.removeAttribute("readonly");
    username.className = "form-control";

    let emailAddress = document.getElementById("profileEmailAddress");
    emailAddress.removeAttribute("readonly");
    emailAddress.className = "form-control";

    let FirstName = document.getElementById("profileFName");
    FirstName.removeAttribute("readonly");
    FirstName.className = "form-control";

    let lastName = document.getElementById("profileLastName");
    lastName.removeAttribute("readonly");
    lastName.className = "form-control";

    let btnDiv = document.getElementById("btnDiv");

    let submitBtn = document.createElement("button");
    submitBtn.className = "btn btn-primary col-5";
    submitBtn.id = "profileSubmitBtn"
    submitBtn.innerText = "Submit";

    let cancelBtn = document.createElement("button");
    cancelBtn.className = "btn btn-secondary col-5 offset-2";
    cancelBtn.id = "profileCancelBtn"
    cancelBtn.innerText = "Cancel";
    btnDiv.appendChild(submitBtn);
    btnDiv.appendChild(cancelBtn);

    submitBtn.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();
            updateProfile();
        }
    )

    cancelBtn.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();
            loadProfile();
        }
    );
}

function updateProfile() {
    const profileForm = document.getElementById("profileForm");
    const currentUsername = sessionStorage.getItem('Username');
    let requestData = [];

    if (profileForm['Username'].value.length > 0 && profileForm['EmailAddress'].value.length > 0 &&
        profileForm['FirstName'].value.length > 0 && profileForm['LastName'].value.length > 0) {
        requestData = JSON.stringify({
            "Action": "updateUser",
            "Data": {
                "CurrentUsername": currentUsername,
                "NewData": {
                    "Username": profileForm['Username'].value,
                    "EmailAddress": profileForm['EmailAddress'].value,
                    "FirstName": profileForm['FirstName'].value,
                    "LastName": profileForm['LastName'].value
                }
            }
        });
    } else {
        alertMessage("Error", "Please fill in all fields");
        $("#modalCentered").modal('show');
    }

    $.post("api/signup.php", requestData, function(data) {
            if(data){
                sessionStorage.setItem('Username', profileForm['Username'].value);
                loadProfile();
            } else {
                alertMessage("Error updating details", "A User already exists with this username",
                    editableProfileForm);
                $("#modalCentered").modal('show');
            }
        })
        .fail(function (error) {
            alertMessage("Error updating details", error,
                editableProfileForm);
            $("#modalCentered").modal('show');
        });
}

function generatePasswordForm() {
    let profileForm = document.getElementById("profileForm");
    profileForm.remove();

    let passwordForm = document.createElement("form");
    passwordForm.id = "passwordForm";
    passwordForm.className = "row g-3 justify-content-center";

    let currPWordDiv = document.createElement("div");
    currPWordDiv.className = "col-md-10 text-left";

    let currPWordLbl = document.createElement("label");
    currPWordLbl.className = "form-label";
    currPWordLbl.innerText = "Enter your current password:";
    currPWordDiv.appendChild(currPWordLbl);

    let currPWordInput = document.createElement("input");
    currPWordInput.type = "password";
    currPWordInput.name = "CurrentPassword";
    currPWordInput.className = "form-control";
    currPWordInput.id = "currentPassword";
    currPWordDiv.appendChild(currPWordInput);
    passwordForm.appendChild(currPWordDiv);

    let newPWordDiv = document.createElement("div");
    newPWordDiv.className = "col-md-10 text-left";

    let newPWordLbl = document.createElement("label");
    newPWordLbl.className = "form-label";
    newPWordLbl.innerText = "Enter the new password:";
    newPWordDiv.appendChild(newPWordLbl);

    let newPWordInput = document.createElement("input");
    newPWordInput.type = "password";
    newPWordInput.name = "NewPassword";
    newPWordInput.className = "form-control";
    newPWordInput.id = "newPassword";
    newPWordDiv.appendChild(newPWordInput);
    passwordForm.appendChild(newPWordDiv);

    let confirmPWordDiv = document.createElement("div");
    confirmPWordDiv.className = "col-md-10 text-left";

    let confirmPWordLbl = document.createElement("label");
    confirmPWordLbl.className = "form-label";
    confirmPWordLbl.innerText = "Re-enter the new password:";
    confirmPWordDiv.appendChild(confirmPWordLbl);

    let confirmPWordInput = document.createElement("input");
    confirmPWordInput.type = "password";
    confirmPWordInput.name = "ConfirmPassword";
    confirmPWordInput.className = "form-control";
    confirmPWordInput.id = "confirmPassword";
    confirmPWordDiv.appendChild(confirmPWordInput);
    passwordForm.appendChild(confirmPWordDiv);

    let btnDiv = document.createElement("div");
    btnDiv.className = "col-md-10 text-center";
    btnDiv.id = "btnDiv";

    let submitBtn = document.createElement("button");
    submitBtn.className = "btn btn-primary col-4";
    submitBtn.id = "passwordSubmitBtn";
    submitBtn.innerText = "Submit";

    let cancelBtn = document.createElement("button");
    cancelBtn.className = "btn btn-secondary col-4 offset-2";
    cancelBtn.id = "passwordCancelBtn";
    cancelBtn.innerText = "Cancel";
    btnDiv.appendChild(submitBtn);
    btnDiv.appendChild(cancelBtn);

    submitBtn.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();
            validatePassword();
        }
    );

    cancelBtn.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();
            loadProfile();
        }
    );

    passwordForm.appendChild(btnDiv);

    let rootDiv = document.getElementById("cardBody");
    rootDiv.appendChild(passwordForm);
}

function validatePassword() {
    let passwordForm = document.getElementById("passwordForm");
    let requestData = [];

    if (passwordForm["CurrentPassword"].value.length > 0 && passwordForm["NewPassword"].value.length > 0 &&
        passwordForm["ConfirmPassword"].value.length > 0) {
        if (passwordForm["NewPassword"].value === passwordForm["ConfirmPassword"].value) {
            requestData = {
                "Action" : "updatePassword",
                "Data" : {
                    "Username": sessionStorage.getItem('Username'),
                    "CurrentPassword" : passwordForm["CurrentPassword"].value,
                    "NewPassword" : passwordForm["NewPassword"].value
                }
            }
        } else {
            Swal.fire("Error:", "New Passwords do not match", "error");
        }
    } else {
        Swal.fire("Error:", "Please fill in all fields!", "error");
    }

    $.post("api/signup.php", JSON.stringify(requestData), function (data) {
        if (data) {
            Swal.fire("Success:", "Password changed successfully!\n"+
                "Please log in with your new password.", "success");
            loadLoginPage();
        } else if (data === "invalid") {
            Swal.fire("Error:", "Incorrect password entered in Current Password.", "error");
        } else {
            Swal.fire("Error:", "Unable to change your password.", "error");
        }
    });
}