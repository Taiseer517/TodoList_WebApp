<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    include "conn.php";
    
    $taskValue = $_POST["taskValue"];

    $insertQuery = "INSERT INTO tasks (Task) VALUES ('$taskValue')";

    if ($conn->query($insertQuery) === TRUE) {
        echo json_encode(array("status" => "success"));
    } else {
        echo json_encode(array("status" => "error"));
    }

    $conn->close();
}
?>
