function pageLoader(){
    let sessionStatus = sessionStorage.getItem('status');
    let sessionUserName = sessionStorage.getItem('Username');

    if (sessionStatus === "loggedIn" && sessionUserName) {
        loadHomePage();
    } else {
        loadLoginPage();
    }
}