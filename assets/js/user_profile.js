function loadProfile() {
    let username = sessionStorage.getItem('Username');
    let RequestArr = {"Action": "loadUser", "Data": username};

    $.post("api/signup.php", JSON.stringify(RequestArr), function (data) {
        if (data) {
            let userDetails = JSON.parse(data)[0];

            let rootDiv = document.getElementById("root");
            rootDiv.innerHTML = "";
            generateProfilePage(userDetails);
        } else {
            alertMessage("Error", "Error loading profile");
            $("#modalCentered").modal('show');
            loadHomePage();
        }
    })

}

function generateProfilePage(userDetails) {

    generateProfileNavbar();
    generateProfileForm(userDetails);
}

function generateProfileForm(userDetails) {

    let rootContainer = document.getElementById("root");

    let cardWrapper = document.createElement("div");
    cardWrapper.id = "cardWrapper";
    cardWrapper.className = "row g-3";

    let cardDiv = document.createElement("div");
    cardDiv.className = "card text-center";
    cardDiv.id = "profileCard";
    cardWrapper.appendChild(cardDiv);
    
    let cardHeader = document.createElement("h5");
    cardHeader.className = "card-header";
    cardHeader.innerText = "Your Account Details:";
    cardDiv.appendChild(cardHeader);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let profileForm = document.createElement("form");
    profileForm.id = "profileForm";
    profileForm.className = "row g-3 justify-content-center";

    //Username input
    let divUsername = document.createElement("div");
    divUsername.className = "col-md-10 form-floating mb-3";

    let usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.name = "Username";
    usernameInput.className = "form-control-plaintext";
    usernameInput.id = "profileUsername";
    usernameInput.value = userDetails["Username"];
    usernameInput.setAttribute("readonly", "");
    usernameInput.setAttribute("required", "");
    divUsername.appendChild(usernameInput);

    let usernameLabel = document.createElement("label");
    usernameLabel.for = "profileUsername";
    usernameLabel.className = "form-label";
    usernameLabel.innerText = "Username:";
    divUsername.appendChild(usernameLabel);
    profileForm.appendChild(divUsername);

    //Email Input
    let divEmail = document.createElement("div");
    divEmail.className = "col-md-10 form-floating mb-3";

    let emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.name = "EmailAddress";
    emailInput.className = "form-control-plaintext";
    emailInput.id = "profileEmailAddress";
    emailInput.value = userDetails["Email"];
    emailInput.setAttribute("readonly", "");
    emailInput.setAttribute("required", "");
    divEmail.appendChild(emailInput);

    let emailLabel = document.createElement("label");
    emailLabel.for = "profileEmailAddress";
    emailLabel.className = "form-label";
    emailLabel.innerText = "Email Address:";
    divEmail.appendChild(emailLabel);
    profileForm.appendChild(divEmail);

    //FirstName Input
    let divFName = document.createElement("div");
    divFName.className = "col-md-10 form-floating mb-3";

    let firstNameInput = document.createElement("input");
    firstNameInput.type = "text";
    firstNameInput.name = "FirstName";
    firstNameInput.className = "form-control-plaintext";
    firstNameInput.id = "profileFName";
    firstNameInput.value = userDetails["FirstName"];
    firstNameInput.setAttribute("readonly", "");
    firstNameInput.setAttribute("required", "");
    divFName.appendChild(firstNameInput);

    let firstNameLabel = document.createElement("label");
    firstNameLabel.for = "profileFName";
    firstNameLabel.className = "form-label";
    firstNameLabel.innerText = "First Name:";
    divFName.appendChild(firstNameLabel);
    profileForm.appendChild(divFName);

    //Last Name Input
    let divLName = document.createElement("div");
    divLName.className = "col-md-10 form-floating mb-3";

    let lastNameInput = document.createElement("input");
    lastNameInput.type = "text";
    lastNameInput.name = "LastName";
    lastNameInput.className = "form-control-plaintext";
    lastNameInput.id = "profileLastName";
    lastNameInput.value = userDetails["LastName"];
    lastNameInput.setAttribute("readonly", "");
    lastNameInput.setAttribute("required", "");
    divLName.appendChild(lastNameInput);
    profileForm.appendChild(divLName);

    let lastNameLabel = document.createElement("label");
    lastNameLabel.for = "profileLastName";
    lastNameLabel.className = "form-label";
    lastNameLabel.innerText = "Last Name:";
    divLName.appendChild(lastNameLabel);

    let editBtnDiv = document.createElement("div");
    editBtnDiv.className = "col-md-10 justify-content-center";
    editBtnDiv.id = "btnDiv";

    let editBtn = document.createElement("button");
    editBtn.className = "btn btn-secondary";
    editBtn.id = "profileEditBtn"
    editBtn.innerText = "Edit Details";
    editBtnDiv.appendChild(editBtn);
    profileForm.appendChild(editBtnDiv);

    cardBody.appendChild(profileForm);
    cardDiv.appendChild(cardBody);
    rootContainer.appendChild(cardWrapper);

    editBtn.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();
            editableProfileForm();
        }
    );
}

function generateProfileNavbar() {
    let rootDiv = document.getElementById("root");

    let navBar = document.createElement("nav");
    navBar.id = "profileNav";
    navBar.className = "nav nav-pills nav-fill";

    let navTitle = document.createElement("h3");
    navTitle.innerText = "MyPost";
    navTitle.className = "nav-item boldHeading";
    navTitle.id = "navHeaderTitle";
    navBar.appendChild(navTitle);

    let navItemProfile = document.createElement("a");
    navItemProfile.className = "nav-item nav-link offset-1";
    navItemProfile.innerText = "Back to Homepage";
    navBar.appendChild(navItemProfile);

    navItemProfile.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();

            $("#root").innerHTML = "";
            pageLoader();
        }
    );

    rootDiv.appendChild(navBar);

}

function editableProfileForm() {

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
    let requestData = JSON.stringify({
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