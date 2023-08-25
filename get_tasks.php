<?php
include "conn.php";

$tasksQuery = "SELECT * FROM tasks";
$tasksResult = $conn->query($tasksQuery);
$tasks = array();

if ($tasksResult->num_rows > 0) {
    while ($row = $tasksResult->fetch_assoc()) {
        $tasks[] = $row;
    }
}

$favoritesQuery = "SELECT * FROM favorites";
$favoritesResult = $conn->query($favoritesQuery);
$favorites = array();

if ($favoritesResult->num_rows > 0) {
    while ($row = $favoritesResult->fetch_assoc()) {
        $favorites[] = $row;
    }
}

$response = array("tasks" => $tasks, "favorites" => $favorites);
echo json_encode($response);

$conn->close();
?>
