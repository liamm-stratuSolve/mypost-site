function loadProfile() {
    let username = sessionStorage.getItem('Username');
    let RequestArr = {"Action": "loadUser", "Data": username};

    $.post("api/signup.php", JSON.stringify(RequestArr), function (data) {
        if (data) {
            let output = JSON.parse(data)[0];
        }
    })

}

function generateFields(userDetails) {
    let containerDiv = document.createElement("div");
    containerDiv.className = "container";


}