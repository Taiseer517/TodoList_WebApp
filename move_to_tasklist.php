<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    include "conn.php";
    
    $taskID = $_POST["taskID"];

    $moveQuery = "INSERT INTO tasks (Task) SELECT favorite_task FROM favorites WHERE favoriteID = '$taskID'";
    $deleteQuery = "DELETE FROM favorites WHERE favoriteID = '$taskID'";

    if ($conn->query($moveQuery) === TRUE && $conn->query($deleteQuery) === TRUE) {
        echo json_encode(array("status" => "success"));
    } else {
        echo json_encode(array("status" => "error"));
    }

    $conn->close();
}
?>
