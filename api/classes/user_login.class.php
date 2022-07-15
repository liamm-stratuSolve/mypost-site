<?php

class userLogin {
    private $ConnectionObj;

    function __construct($ConnectionObj) {
        $this->ConnectionObj = $ConnectionObj;
    }

    function validateLoginDetails($Username, $Password) {
        $UserPassword = "";
        $SqlStr = "SELECT * FROM `Users` WHERE `Username`='".$Username."'";

        $ResultObj = $this->ConnectionObj->query($SqlStr);

        if($ResultObj->num_rows > 0) {
            while($RowArr = $ResultObj->fetch_assoc()){
                    $UserPassword = $RowArr["Password"];
            }
        } else {
            return false;
        }

        if (password_verify($Password, $UserPassword)) {
            return true;
        } else {
            return false;
        }
    }
}