<?php

    class UserMaintenance {

        public $ConnectionObj;

        function __construct($ConnectionObj){
            $this->ConnectionObj = $ConnectionObj;
        }

        function createUser($PersonArr) : bool {
            $EncryptedPassword = password_hash($PersonArr['Password'], PASSWORD_DEFAULT);
            error_log($EncryptedPassword);
            $SqlStr = "INSERT INTO `Users` (`FirstName`, `LastName`, `EmailAddress`, `Username`, `Password`) VALUES ('".
                $PersonArr['FirstName']."', '".$PersonArr['LastName']."', '".$PersonArr['EmailAddress'].
                "', '".$PersonArr['Username']."', '".$EncryptedPassword."')";

            return $this->ConnectionObj->query($SqlStr);
        }

        function loadUser($Username) : array | bool {
            $ResultArr = array();
            $SqlStr = "SELECT `FirstName`, `LastName`, `EmailAddress` FROM `Users` WHERE `Username`='".$Username."'";

            $ResultObj = $this->ConnectionObj->query($SqlStr);

            if ($ResultObj->num_rows > 0) {
                while($RowArr = $ResultObj->fetch_assoc()){
                    $ResultArr[] = array(
                        "FirstName" => $RowArr["FirstName"],
                        "LastName" => $RowArr["LastName"],
                        "Email" => $RowArr["EmailAddress"]
                    );
                }
                return $ResultArr;
            } else {
                return $ResultObj;
            }
        }

        function loadAllUsers() : array | bool {
            $ResultArr = array();
            $SqlStr = "SELECT * FROM `Users`";

            $ResultObj = $this->ConnectionObj->query($SqlStr);

            if($ResultObj->num_rows > 0) {
                while($RowArr = $ResultObj->fetch_assoc()){
                    $ResultArr[] = array(
                        "FirstName" => $RowArr["FirstName"],
                        "LastName" => $RowArr["LastName"],
                        "EmailAddress" => $RowArr["EmailAddress"],
                        "Username" => $RowArr["Username"]
                    );
                }
                return $ResultArr;
            } else {
                return false;
            }
        }

        function saveUser($CurrentUserNameStr, $NewDataArr) : bool {
            $SqlStr = "UPDATE `Users` SET `FirstName`='".$NewDataArr["FirstName"]."',`LastName`='".
                $NewDataArr["LastName"]."',`EmailAddress`='".$NewDataArr["EmailAddress"]."'".
                ",`Username`='".$NewDataArr["Username"]."' WHERE Username='".$CurrentUserNameStr."'";

            return $this->ConnectionObj->query($SqlStr);
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

        function deleteAllUsers() : bool {
            $SqlStr = "DELETE FROM `Users`";
            return $this->ConnectionObj->query($SqlStr);
        }
    }