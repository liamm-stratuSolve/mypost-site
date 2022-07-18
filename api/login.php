<?php

require_once "./classes/user_login.class.php";

$ConnectionObj = connectToDB();
$UserLogin = new userLogin($ConnectionObj);
$DataObj = file_get_contents("php://input");

$RequestDataArr = json_decode($DataObj, true);

$ResultStr = $UserLogin->validateLoginDetails($RequestDataArr["Data"]["Username"], $RequestDataArr["Data"]["Password"]);
if($ResultStr){
    http_response_code(200);
    echo true;
} else {
    die(false);
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