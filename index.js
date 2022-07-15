function pageLoader(){
    let sessionStatus = sessionStorage.getItem('status');

    if (sessionStatus === "loggedIn") {
        console.log("Logged in");
    } else {
        loadLoginPage();
    }
}

