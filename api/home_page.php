<?php

require_once "classes/home_page.class.php";
require_once "classes/user_maintenance.class.php";

$ConnectionObj = connectDB();
$HomePage = new managePosts($ConnectionObj);
$UserMaint = new UserMaintenance($ConnectionObj);
$DataObj = file_get_contents("php://input");
$RequestDataArr = json_decode($DataObj, true);

error_log(json_encode($RequestDataArr));
$ActionStr = $RequestDataArr["Action"];
error_log($ActionStr);

switch ($ActionStr) {

    case "getAllPosts":
        $UserListResultArr = $UserMaint->loadAllUserCardDetails();
        $PostCarDetailsArr = $HomePage->loadAllPosts();
        $ResultJson = [];
//        error_log(json_encode($UserListResultArr));

        foreach ($UserListResultArr as $User) {

            foreach ($PostCarDetailsArr as $Post) {
                if ($User["UserID"] === $Post["UserID"]) {
                    $Post["UserFullName"] = $User["FirstName"]. " " .$User["LastName"];
                    $Post["Username"] = $User["Username"];
                    $ResultJson[] = $Post;
                }
            }
        }

        if ($ResultJson) {
            echo json_encode($ResultJson);
        } else {
            die(false);
        }
        break;

    case "getCurrentUserDetails":
        $RequestObj = $RequestDataArr["Data"];
        $ResultObj = $UserMaint->loadUser($RequestObj);
        if($ResultObj) {
            echo json_encode($ResultObj);
        } else {
            die(false);
        }
        break;

    case "updatePost":
        $RequestObj = $RequestDataArr["Data"];
        error_log(json_encode($RequestObj));
        $ResultObj = $HomePage->editPost($RequestObj["PostID"], $RequestObj["NewPostText"]);
        if($ResultObj) {
            echo true;
        } else {
            die(false);
        }
        break;

    case "updateUserDetails":
        $RequestObj = $RequestDataArr["Data"];
        $ResultObj = $UserMaint->saveUser($RequestObj);
        if ($ResultObj) {
            echo true;
        } else {
            die(false);
        }
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