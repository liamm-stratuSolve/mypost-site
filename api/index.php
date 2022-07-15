<?php
$ConnectionObj = connectDB();



function connectDB() : mysqli{
    $ServerStr = "localhost";
    $DataBaseStr = "MyPost";
    $UsernameStr = "root";
    $PasswordStr = "";

    $Conn = new mysqli($ServerStr, $UsernameStr, $PasswordStr, $DataBaseStr);

    if($Conn->connect_error){
        echo("Unsuccessful Connection: ". $Conn->connect_error);
    } else {
        echo("Success");
    }

    return $Conn;
}