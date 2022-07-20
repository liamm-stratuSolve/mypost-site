<?php

    class UserMaintenance {

        public $ConnectionObj;

        function __construct($ConnectionObj){
            $this->ConnectionObj = $ConnectionObj;
        }

        function createUser($PersonArr) : bool {
            $EncryptedPassword = password_hash($PersonArr['Password'], PASSWORD_DEFAULT);

            $SqlStr = "INSERT INTO `Users` (`FirstName`, `LastName`, `EmailAddress`, `Username`, `Password`) ".
                "VALUES ('".$PersonArr['FirstName']."', '".$PersonArr['LastName']."', '".
                $PersonArr['EmailAddress']."', '".$PersonArr['Username']."', '".$EncryptedPassword."')";

            $ResultObj = $this->ConnectionObj->query($SqlStr);

            if ($ResultObj) {
                return true;
            } else {
                return false;
            }
        }

        function loadUser($UsernameStr) : array | bool {
            $ResultArr = array();
            $SqlStr = "SELECT `FirstName`, `LastName`, `EmailAddress`, `Username` FROM `Users` WHERE ".
                "`Username`='".$UsernameStr."'";

            $ResultObj = $this->ConnectionObj->query($SqlStr);

            if ($ResultObj->num_rows > 0) {
                while($RowArr = $ResultObj->fetch_assoc()){
                    $ResultArr[] = array(
                        "FirstName" => $RowArr["FirstName"],
                        "LastName" => $RowArr["LastName"],
                        "Email" => $RowArr["EmailAddress"],
                        "Username" => $RowArr["Username"]
                    );
                }
                return $ResultArr;
            } else {
                return false;
            }
        }

        function loadAllUserCardDetails() : array | bool {
            $UsersArray = array();
            $SqlStr = "SELECT `FirstName`, `LastName`, `Username`, `id` FROM `Users`";

            $ResultObj = $this->ConnectionObj->query($SqlStr);

            if ($ResultObj) {
                while ($RowArr = $ResultObj->fetch_assoc()){
                    $UsersArray[] = array(
                        "UserID" => $RowArr["id"],
                        "Username" => $RowArr["Username"],
                        "FirstName" => $RowArr["FirstName"],
                        "LastName" => $RowArr["LastName"]
                    );
                }
                return $UsersArray;
            } else {
                return false;
            }
        }

        function saveUser($RequestDataArr) : bool | string {
            $CurrentUsernameStr = $_SESSION['Username'];
            $NewDataArr = $RequestDataArr["NewData"];

            if($CurrentUsernameStr !== $NewDataArr["Username"]) {
                $ValidateSql = "SELECT * FROM `Users` WHERE `Username`='" . $NewDataArr["Username"] . "'";
                $ValidateResponseObj = $this->ConnectionObj->query($ValidateSql);

                if($ValidateResponseObj->num_rows > 0) {
                    die();
                }
            }


            $SqlStr = "UPDATE `Users` SET `FirstName`='".$NewDataArr["FirstName"]."',`LastName`='".
                $NewDataArr["LastName"]."',`EmailAddress`='".$NewDataArr["EmailAddress"]."'".
                ",`Username`='".$NewDataArr["Username"]."' WHERE Username='".$CurrentUsernameStr."'";

            $ResultObj = $this->ConnectionObj->query($SqlStr);

            if($ResultObj){
                return $NewDataArr["Username"];
            } else {
                die();
            }
        }

        function getUserID($UsernameStr) : bool | string {
            $SqlStr = "SELECT `id` FROM `Users` WHERE `Username`='".$UsernameStr."'";
            $UserIDStr = "";
            $ResultObj = $this->ConnectionObj->query($SqlStr);

            if($ResultObj->num_rows > 0) {
                while($RowArr = $ResultObj->fetch_assoc()){
                    $UserIDStr = $RowArr["id"];
                }
                return  $UserIDStr;
            } else {
                return false;
            }
        }

        function updatePassword($RequestDataArr) : bool {
            $UsernameStr = $_SESSION['Username'];
            $CurrentPasswordStr = $RequestDataArr["CurrentPassword"];
            $NewPasswordStr = $RequestDataArr["NewPassword"];
            $ValidationPasswordStr = "";

            $DataBasePasswordObj = $this->ConnectionObj->query("SELECT `Password` FROM `Users` WHERE `Username`='".
                $UsernameStr."'");
            if($DataBasePasswordObj->num_rows > 0) {
                while($RowArr = $DataBasePasswordObj->fetch_assoc()) {
                    $ValidationPasswordStr = $RowArr["Password"];
                }
            }

            $ValidateCurrentPWord = password_verify($CurrentPasswordStr, $ValidationPasswordStr);

            if($ValidateCurrentPWord){
                $EncryptedPasswordStr = password_hash($NewPasswordStr, PASSWORD_DEFAULT);
                $SqlStr = "UPDATE `Users` SET `Password`='".$EncryptedPasswordStr."' WHERE Username='".
                    $UsernameStr."'";
                $ResultObj = $this->ConnectionObj->query($SqlStr);
                return json_encode($ResultObj);
            } else {
                return json_encode("invalid");
            }
        }
    }