<?php

class managePosts {
    public $ConnectionObj;

    function __construct($ConnectionObj) {
        $this->ConnectionObj = $ConnectionObj;
    }

    function createPost($UserID, $PostText) : bool {
        $PostTimeStamp = date("Y-m-d H:i:s");
        $SqlStr = "INSERT INTO `Posts` (`PostTimeStamp`, `PostText`, `UserID`) VALUES ('".
            $PostTimeStamp."', '".$PostText."', '".$UserID."')";

        $ResultObj = $this->ConnectionObj->query($SqlStr);

        if ($ResultObj) {
            error_log(true);
            return true;
        } else {
            error_log(false);
            return false;
        }
    }

    function loadPostByUserID($UserID) : array | bool {
        $SqlStr = "SELECT `PostID`, `PostTimeStamp`, `PostText`, `UserID` FROM `Posts` WHERE `UserID`='".
        $UserID."'";

        $ResultObj = $this->ConnectionObj->query($SqlStr);

        return $this->generateResults($ResultObj);
    }

    function loadPostByPostID($PostID) : array | bool {
        $SqlStr = "SELECT `PostID`, `PostTimeStamp`, `PostText`, `UserID` FROM `Posts` WHERE `PostID`='".
            $PostID."'";

        $ResultObj = $this->ConnectionObj->query($SqlStr);

        return $this->generateResults($ResultObj);
    }

    function loadPostByText($SearchText) : array | bool {
        $SqlStr = "SELECT * FROM `Posts` WHERE `PostText` LIKE '%".$SearchText."%'";

        $ResultObj = $this->ConnectionObj->query($SqlStr);

        return $this->generateResults($ResultObj);
    }

    function loadAllPost() : array | bool {
        $SqlStr = "SELECT * FROM `Posts`";

        $ResultObj = $this->ConnectionObj->query($SqlStr);

        return $this->generateResults($ResultObj);
    }

    function generateResults($ResultObj) : array | bool {
        if($ResultObj->num_rows > 0) {
            while($RowArr = $ResultObj->fetch_assoc()) {
                $ResultArray[] = array(
                    "PostID" => $RowArr["PostID"],
                    "PostTimeStamp" => $RowArr["PostTimeStamp"],
                    "PostText" => $RowArr["PostText"],
                    "UserID" => $RowArr["UserID"]
                );
            }
            return $ResultArray;
        } else {
            return false;
        }
    }

    function editPost($PostID, $NewPostText) : string {

        $SqlStr = "UPDATE `Posts` SET `PostText`='".$NewPostText."' WHERE `PostID`='".
            $PostID."'";

        return $this->ConnectionObj->query($SqlStr);
    }

    function deletePost($PostID) : bool {
        $SqlStr = "DELETE FROM `Posts` WHERE `PostID`='".$PostID."'";

        return $this->ConnectionObj->query($SqlStr);
    }
}