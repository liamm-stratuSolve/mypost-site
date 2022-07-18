<?php

    class UserMaintenance {

        public $ConnectionObj;

        function __construct($ConnectionObj){
            $this->ConnectionObj = $ConnectionObj;
        }

        function createUser($PersonArr) : bool {
            $EncryptedPassword = password_hash($PersonArr['Password'], PASSWORD_DEFAULT);
            error_log("Encrypted Password: ". $EncryptedPassword);
            $SqlStr = "INSERT INTO `Users` (`FirstName`, `LastName`, `EmailAddress`, `Username`, `Password`) VALUES ('".
                $PersonArr['FirstName']."', '".$PersonArr['LastName']."', '".$PersonArr['EmailAddress'].
                "', '".$PersonArr['Username']."', '".$EncryptedPassword."')";

            $Result = $this->ConnectionObj->query($SqlStr);

            if ($PersonArr) {
                return true;
            } else {
                return false;
            }
        }

        function loadUser($UsernameStr) : array | bool {
            $ResultArr = array();
            $SqlStr = "SELECT `FirstName`, `LastName`, `EmailAddress`, `Username` FROM `Users` WHERE `Username`='".
                $UsernameStr."'";

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
            $CurrentUsernameStr = $RequestDataArr["CurrentUsername"];
            $NewDataArr = $RequestDataArr["NewData"];

            if($CurrentUsernameStr !== $NewDataArr["Username"]) {
                $ValidateSql = "SELECT * FROM `Users` WHERE `Username`='" . $NewDataArr["Username"] . "'";
                $ValidateResponse = $this->ConnectionObj->query($ValidateSql);

                if($ValidateResponse->num_rows > 0) {
                    die(false);
                }
            }


            $SqlStr = "UPDATE `Users` SET `FirstName`='".$NewDataArr["FirstName"]."',`LastName`='".
                $NewDataArr["LastName"]."',`EmailAddress`='".$NewDataArr["EmailAddress"]."'".
                ",`Username`='".$NewDataArr["Username"]."' WHERE Username='".$CurrentUsernameStr."'";

            $ResultObj = $this->ConnectionObj->query($SqlStr);

            if($ResultObj){
                return $NewDataArr["Username"];
            } else {
                die(false);
            }
        }

        function updatePassword($Username, $NewPassword) : bool {
            $EncryptedPassword = password_hash($NewPassword, PASSWORD_DEFAULT);

            $SqlStr = "UPDATE `Users` SET `Password`='".$EncryptedPassword."' WHERE Username='".$Username."'";

            return $this->ConnectionObj->query($SqlStr);
        }

        function deleteUser($Username) : bool {
            $SqlStr = "DELETE FROM `Users` WHERE `Username`='".$Username."'";

            return $this->ConnectionObj->query($SqlStr);
        }
    }