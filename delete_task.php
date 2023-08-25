<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    include "conn.php";
    
    $taskID = $_POST["taskID"];

    $deleteQuery = "DELETE FROM tasks WHERE TaskID = '$taskID'";

    if ($conn->query($deleteQuery) === TRUE) {
        echo json_encode(array("status" => "success"));
    } else {
        echo json_encode(array("status" => "error"));
    }

    $conn->close();
}
?>
