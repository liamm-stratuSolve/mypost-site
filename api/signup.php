<?php

require_once "./classes/user_maintenance.class.php";

$RequestType = $_SERVER['REQUEST_METHOD'];
$ConnectionObj = connectDB();
$UserMaintenance = new UserMaintenance($ConnectionObj);
$DataObj = file_get_contents("php://input");
$RequestDataArr = json_decode($DataObj, true);

$ActionStr = $RequestDataArr["Action"];
$RequestDataObj = $RequestDataArr["Data"];

switch ($ActionStr) {
    case "updateUser":
        $ResultObj = $UserMaintenance->saveUser($RequestDataObj);
        echo json_encode($ResultObj);
        break;

    case "loadUser":
        $ResultObj = $UserMaintenance->loadUser($RequestDataObj);
        if(count($ResultObj) > 0) {
            echo json_encode($ResultObj);
        } else {
            echo false;
        }
        break;

    case "createUser":
        $ResultObj = $UserMaintenance->createUser($RequestDataObj);
        echo $ResultObj;
        break;
}

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