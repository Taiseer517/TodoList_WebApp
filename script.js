document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const favoritesList = document.getElementById("favoritesList");

    function fetchTasksAndFavorites() {
        fetch("get_tasks.php")
            .then(response => response.json())
            .then(data => {
                const tasks = data.tasks;
                const favorites = data.favorites;

                taskList.innerHTML = "";
                favoritesList.innerHTML = "";

                tasks.forEach(task => {
                    const li = createTaskListItem(task.Task);
                    taskList.appendChild(li);
                });

                favorites.forEach(favorite => {
                    const li = createTaskListItem(favorite.favorite_task, true);
                    favoritesList.appendChild(li);
                });
            });
    }

    fetchTasksAndFavorites();

    addTaskBtn.addEventListener("click", function () {
        const taskValue = taskInput.value.trim();
        if (taskValue !== "") {
            const li = createTaskListItem(taskValue);

            taskList.appendChild(li);

            fetch("add_task.php", {
                method: "POST",
                body: new URLSearchParams({
                    taskValue: taskValue
                })
            });

            taskInput.value = "";
        }

        return false;
    });

    function toggleFavorite(taskID, isFavorite) {
        const requestURL = isFavorite ? "move_to_tasklist.php" : "move_to_favorites.php";
        const requestData = new URLSearchParams({
            taskID: taskID
        });

        fetch(requestURL, {
            method: "POST",
            body: requestData
        }).then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    fetchTasksAndFavorites();
                }
            });
    }

    function deleteTask(taskID) {
        fetch("delete_task.php", {
            method: "POST",
            body: new URLSearchParams({
                taskID: taskID
            })
        }).then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    fetchTasksAndFavorites();
                }
            });
    }

    function createTaskListItem(taskValue, isFavorite = false) {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.textContent = taskValue;

        const iconContainer = document.createElement("div");
        iconContainer.classList.add("d-flex", "align-items-center");

        const starIcon = document.createElement("i");
        starIcon.classList.add("fas", "fa-star", "me-2");
        starIcon.style.color = isFavorite ? "gold" : "white";
        starIcon.addEventListener("click", function () {
            const taskID = li.getAttribute("data-task-id");
            toggleFavorite(taskID, isFavorite);
        });

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fas", "fa-trash-alt", "text-danger");
        trashIcon.addEventListener("click", function () {
            const taskID = li.getAttribute("data-task-id");
            deleteTask(taskID);
        });

        iconContainer.appendChild(starIcon);
        iconContainer.appendChild(trashIcon);

        li.appendChild(iconContainer);

        const taskID = Date.now();
        li.setAttribute("data-task-id", taskID);

        return li;
    }
});
