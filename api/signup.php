<?php

require_once "./classes/user_maintenance.class.php";

$RequestType = $_SERVER['REQUEST_METHOD'];
$ConnectionObj = connectDB();
$UserMaintenance = new UserMaintenance($ConnectionObj);

function connectDB() : mysqli{
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