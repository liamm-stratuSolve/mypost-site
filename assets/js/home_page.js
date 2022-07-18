function loadHomePage() {

    let responseRequest = {"Action": "getAllPosts"};
    let responseJson = [];

    let cardContainer = document.createElement("div");

    let cardWrapper = document.createElement("div");
    cardWrapper.id = "cardWrapper";
    cardWrapper.className = "row g-3";
    cardContainer.appendChild(cardWrapper);

    generateNavBar();

    let rootDiv = document.getElementById("root");
    rootDiv.appendChild(cardWrapper);


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
    navBar.className = "nav nav-pills nav-fill";

    let navTitle = document.createElement("h3");
    navTitle.innerText = "MyPost";
    navTitle.className = "nav-item boldHeading";
    navTitle.id = "navHeaderTitle";
    navBar.appendChild(navTitle);

    let navItemCreate = document.createElement("a");
    navItemCreate.className = "nav-item nav-link";
    navItemCreate.innerText = "Create a new post";
    navBar.appendChild(navItemCreate);

    let navItemProfile = document.createElement("a");
    navItemProfile.className = "nav-item nav-link";
    navItemProfile.innerText = "Your Profile";
    navBar.appendChild(navItemProfile);

    navItemProfile.addEventListener(
        'click', () => {
            event.preventDefault();
            event.stopImmediatePropagation();
            loadProfile();
        }
    );

    rootDiv.appendChild(navBar);

}

function generatePostCard(cardDetails){

    // console.log(cardDetails);
    let cardUserID = "user" + cardDetails["UserID"];
    let cardID = cardDetails["PostID"];

    let cardWrapDiv = document.createElement("div");
    cardWrapDiv.className = "col-sm-12 text-left";

    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.id = "divID" + cardID;

    let cardHeader = document.createElement("div");
    cardHeader.className = "card-header";

    let usernameHeader = document.createElement("h4");
    usernameHeader.innerText = cardDetails["Username"] + " - ";
    cardHeader.appendChild(usernameHeader);

    let postDate = document.createElement("h6");
    let timeStamp = new Date(cardDetails["PostTimeStamp"]).toLocaleDateString('en-us', { weekday:"short",
        year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric", hour12: false});
    cardHeader.appendChild(postDate);
    cardDiv.appendChild(cardHeader);
    postDate.innerText = timeStamp;

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

    // let editButton = document.createElement("button");
    // editButton.className="btn btn-secondary";
    // editButton.id = "editBtn" + cardID ;
    // editButton.innerText = "Edit Post";
    // cardDiv.appendChild(editButton);
    //
    // editButton.addEventListener(
    //     'click', function () {
    //         editPost(cardDetails["PostText"], cardID);
    //     }
    // );

    let rootDiv = document.getElementById("cardWrapper");
    rootDiv.appendChild(cardWrapDiv);
}

function editPost(cardText, cardID) {

    let cardBody = document.getElementById("bodyText" + cardID);
    let editBtn = document.getElementById(  "editBtn" + cardID);
    let blockQuote = document.getElementById("blockQuote" + cardID);
    let cardDiv = document.getElementById("divID" + cardID);

    let cardBodyText = document.createElement("textarea");
    cardBodyText.class = "form-control";
    cardBodyText.name = "PostText"
    cardBodyText.id = "inputText" + cardID;
    cardBodyText.value = cardText;

    let submitBtn = document.createElement("button");
    submitBtn.className="btn btn-primary";
    submitBtn.innerText = "Submit";

    cardBody.remove();
    editBtn.remove();
    blockQuote.insertBefore(cardBodyText, blockQuote.firstChild);
    cardDiv.appendChild(submitBtn);

    submitBtn.addEventListener(
        'click', function() {
            let textInput = document.getElementById("inputText" + cardID);
            if (textInput.value) {
                let requestData = {
                        "PostID" : cardID,
                        "NewPostText" : textInput.value
                };

                let requestArr = JSON.stringify({"Action": "createUser", "Data": requestData});

                console.log(requestArr);
                $.post ("api/home_page.php", requestArr,
                    function (data) {
                        if (data) {
                            let rootDiv = document.getElementById("root");
                            rootDiv.innerHTML = "";
                            loadHomePage();
                        } else {
                            console.log("Failed");
                        }
                });
            }
        }
    )
}

function generateNavbar() {

}

class profilePage {
    constructor() {
    }


}