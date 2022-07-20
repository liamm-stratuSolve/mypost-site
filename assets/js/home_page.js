function loadHomePage() {

    let responseRequest = {"Action": "getAllPosts"};
    let responseJson = [];

    let rootDiv = document.getElementById("root");
    rootDiv.innerHTML = "";

    let cardWrapper = document.createElement("div");
    cardWrapper.id = "cardWrapper";
    cardWrapper.className = "row g-4";

    generateNavBar();
    rootDiv.appendChild(cardWrapper);
    generateCreatePostCard();

    $.post("api/home_page.php", JSON.stringify(responseRequest))
        .done(function (response) {

            responseJson = JSON.parse(response);
            responseJson.sort( function (a,b) {
                return a.PostID - b.PostID;
            });

            responseJson.reverse().forEach(Obj => {
                    generatePostCard(Obj);
            });
        });
}

function generateNavBar(){
    let rootDiv = document.getElementById("root");

    let navBar = document.createElement("nav");
    navBar.className = "nav fixed-top nav-pills nav-fill";

    let navTitle = document.createElement("h1");
    navTitle.innerText = "MyPost";
    navTitle.className = "nav-item boldHeading";
    navTitle.id = "navHeaderTitle";
    navBar.appendChild(navTitle);

    let navItemProfile = document.createElement("a");
    navItemProfile.className = "nav-item nav-link offset-2";
    navItemProfile.innerText = "Your Profile";
    navBar.appendChild(navItemProfile);

    let navItemLogout = document.createElement("a");
    navItemLogout.className = "nav-item nav-link navLogout";
    navItemLogout.innerText = "Log Out";
    navBar.appendChild(navItemLogout);

    navItemProfile.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();
            loadProfile();
        }
    );

    navItemLogout.addEventListener(
        'click', () => {
            logout();
        }
    );

    rootDiv.appendChild(navBar);
}

function generatePostCard(cardDetails){

    let cardID = cardDetails["PostID"];

    let cardWrapDiv = document.createElement("div");
    cardWrapDiv.className = "col-sm-12 text-left";

    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.id = "divID" + cardID;

    let cardHeader = document.createElement("div");
    cardHeader.className = "card-header";

    let headerSpan = document.createElement("span");
    headerSpan.className = "col-sm-12 d-flex flex-row align-items-center justify-content-between";
    cardHeader.appendChild(headerSpan);

    let usernameHeader = document.createElement("h4");
    usernameHeader.innerText = cardDetails["Username"];
    headerSpan.appendChild(usernameHeader);

    let postDate = document.createElement("h6");
    let timeStamp = new Date(cardDetails["PostTimeStamp"]).toLocaleDateString('en-us', { weekday:"short",
        year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric", hour12: false});
    postDate.innerText = timeStamp;
    headerSpan.appendChild(postDate);
    cardDiv.appendChild(cardHeader);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let blockQuote = document.createElement("blockquote");
    blockQuote.className = "blockquote mb-0";
    blockQuote.id =  "blockQuote" + cardID;

    let bodyText = document.createElement("p");
    bodyText.id = "bodyText" + cardID;
    bodyText.innerText = cardDetails["PostText"];
    blockQuote.appendChild(bodyText);
    cardDiv.appendChild(blockQuote);
    cardWrapDiv.appendChild(cardDiv);

    let rootDiv = document.getElementById("cardWrapper");
    rootDiv.appendChild(cardWrapDiv);
}

function generateCreatePostCard() {
    let rootContainer = document.getElementById("cardWrapper");

    let createPostChecker = document.getElementById("newCreatePostCard");
    if(createPostChecker) {
        createPostChecker.remove();
    }

    let  cardContainer = document.createElement("div");
    cardContainer.className = "col-sm-12 text-left";
    cardContainer.id = "newCreatePostCard";

    let cardDiv = document.createElement("div");
    cardDiv.className = "card text-center";
    cardContainer.appendChild(cardDiv)

    let cardHeader = document.createElement("h5");
    cardHeader.className = "card-header";
    cardHeader.innerText = "New Post";
    cardDiv.appendChild(cardHeader);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let bodyForm = generateCreatePostForm();
    cardBody.appendChild(bodyForm);
    cardDiv.appendChild(cardBody);


    rootContainer.appendChild(cardContainer);
}

function generateCreatePostForm(){
    let createForm = document.createElement("form");
    createForm.id = "createForm";
    createForm.className = "row g-3 justify-content-center";

    let postTextDiv = document.createElement("div");
    postTextDiv.className = "col-md-10 text-left";
    postTextDiv.id = "newPostCard";

    let postTextLabel = document.createElement("label");
    postTextLabel.for = "createPostText";
    postTextLabel.className = "form-label";
    postTextLabel.innerText = "Whatcha thinking?";
    postTextDiv.appendChild(postTextLabel);

    let postTextInput = document.createElement("textarea");
    postTextInput.type = "text";
    postTextInput.name = "CreatePostText";
    postTextInput.className = "form-control";
    postTextInput.id = "createPostText";
    postTextInput.rows = 5;
    postTextInput.setAttribute("required", "");
    postTextDiv.appendChild(postTextInput);
    createForm.appendChild(postTextDiv)

    postTextInput.addEventListener(
        'keyup', () => {
            characterCounter();
        }
    )

    let btnDiv = document.createElement("div");
    btnDiv.className = "d-flex justify-content-around";

    let submitButton = document.createElement("button");
    submitButton.className = "btn btn-primary col-4";
    submitButton.setAttribute("data-dismiss", "modal");
    submitButton.setAttribute("data-target", "#modalCentered");
    submitButton.innerText = "Submit";

    submitButton.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();
            validateInput();
        }
    )

    btnDiv.appendChild(submitButton);

    let counterBtn = document.createElement("button");
    counterBtn.id = "counterBtn"
    counterBtn.className = "btn btn-secondary col-4";
    counterBtn.innerText = "Word Count: 0/350";

    counterBtn.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    )

    btnDiv.appendChild(counterBtn);

    createForm.appendChild(btnDiv);

    return createForm;
}

function characterCounter() {
    let maxLimit = 350;
    let counterBtn = document.getElementById("counterBtn");
    let textInput = document.getElementById("createPostText");
    let currentCount = textInput.value.length;
    counterBtn.innerText = "Word Count: " + currentCount + "/350";
    if (currentCount > maxLimit) {
        counterBtn.className = "btn overCount col-4";
    } else {
        counterBtn.className = "btn btn-secondary col-4";
    }
}

function validateInput() {
    let postTextForm = document.getElementById("createForm");
    let requestArray = [];
    let validationString = postTextForm['CreatePostText'].value.replace(/\s/g, '');

    if (validationString.length > 0) {
        requestArray = {
            "Action" : "createPost",
            "Data" : {
                "PostText" : postTextForm['CreatePostText'].value
            }
        }

        createPost(requestArray);
    } else {
        Swal.fire("Error", "Please fill in the field.", "error");
    }
}

function createPost(dataArray) {
    let requestData = JSON.stringify(dataArray);

    $.post("api/home_page.php", requestData, function (data) {
        if(data) {
            loadHomePage();
        } else {
            Swal.fire("Error:", "Error creating post", "error");
        }
    });
}