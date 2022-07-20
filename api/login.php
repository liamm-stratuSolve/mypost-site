<?php

require_once "./classes/user_login.class.php";

$ConnectionObj = connectToDB();
$UserLogin = new userLogin($ConnectionObj);
$DataObj = file_get_contents("php://input");

$RequestDataArr = json_decode($DataObj, true);
$ActionStr = $RequestDataArr["Action"];
$DataArr = $RequestDataArr["Data"];

switch ($ActionStr) {
    case "logIn":
        session_start();

        $ResultStr = $UserLogin->validateLoginDetails($DataArr["Username"],
            $DataArr["Password"]);

        if($ResultStr === true){
            $_SESSION['Username'] = $DataArr["Username"];
            $_SESSION['LoggedIn'] = true;
            echo true;
        } else {
            die();
        }
        break;

    case "logOut":
        session_start();
        session_destroy();
        if (session_status() == PHP_SESSION_NONE) {
            echo true;
        } else {
            die();
        }
        break;

    case "startSession":
        session_start();
        if (session_status() != PHP_SESSION_NONE) {
            echo true;
        } else {
            die();
        }
        break;

    case "validateLoginState":
        session_start();
        $LoggedInUsername = isset($_SESSION['Username']);
        $LoggedInState = isset($_SESSION['LoggedIn']);

        if($LoggedInUsername && $LoggedInState) {
            echo true;
        } else {
            die();
        }
        break;
}


function connectToDB() : mysqli{
    $ServerStr = "localhost";
    $DataBaseStr = "MyPost";
    $UsernameStr = "root";
    $PasswordStr = "";

    $ConnObj = new mysqli($ServerStr, $UsernameStr, $PasswordStr, $DataBaseStr);

    if($ConnObj->connect_error){
        die(error_log("Unsuccessful Connection: ". $ConnObj->connect_error));
    }

    return $ConnObj;
}