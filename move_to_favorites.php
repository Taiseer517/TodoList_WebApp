<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    include "conn.php";
    
    $taskID = $_POST["taskID"];

    $moveQuery = "INSERT INTO favorites (favorite_task) SELECT Task FROM tasks WHERE TaskID = '$taskID'";
    $deleteQuery = "DELETE FROM tasks WHERE TaskID = '$taskID'";

    if ($conn->query($moveQuery) === TRUE && $conn->query($deleteQuery) === TRUE) {
        echo json_encode(array("status" => "success"));
    } else {
        echo json_encode(array("status" => "error"));
    }

    $conn->close();
}
?>
