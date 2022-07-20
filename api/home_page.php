<?php

require_once "classes/home_page.class.php";
require_once "classes/user_maintenance.class.php";

$ConnectionObj = connectDB();
$HomePage = new managePosts($ConnectionObj);
$UserMaint = new UserMaintenance($ConnectionObj);
$DataObj = file_get_contents("php://input");
$RequestDataArr = json_decode($DataObj, true);

$ActionStr = $RequestDataArr["Action"];

switch ($ActionStr) {

    case "createPost":
        session_start();
        $Username = $_SESSION['Username'];
        $DataArr = $RequestDataArr["Data"];
        $PostText = $DataArr["PostText"];
        $UserID = $UserMaint->getUserID($Username);
        $ResultObj = $HomePage->createPost($UserID, $PostText);

        if ($ResultObj) {
            echo true;
        } else {
            die(false);
        }
        break;

    case "getAllPosts":
        $UserListResultArr = $UserMaint->loadAllUserCardDetails();
        $PostCarDetailsArr = $HomePage->loadAllPosts();
        $ResultJson = [];

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
        session_start();
        $ResultObj = $UserMaint->loadUser($_SESSION['Username']);
        if($ResultObj) {
            echo json_encode($ResultObj);
        } else {
            die(false);
        }
        break;

    case "updatePost":
        session_start();
        $RequestObj = $RequestDataArr["Data"];
        $ResultObj = $HomePage->editPost($RequestObj["PostID"], $RequestObj["NewPostText"]);
        if($ResultObj) {
            echo true;
        } else {
            die(false);
        }
        break;

    case "updateUserDetails":
        session_start();
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