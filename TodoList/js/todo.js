const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const bodyInput = document.querySelector(".bodyInput-input");

document.addEventListener("DOMContentLoaded", getServerTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

const userId = JSON.parse(localStorage.getItem("user"))?.id;
const apiUrl = `https://6570538609586eff66412160.mockapi.io/todo/api/v1/Login/${userId}/todo`;

async function addTodo(event) {
    event.preventDefault();
    const todoText = todoInput.value;
    const todoBody = bodyInput.value;

    if (todoText.trim() === "" || todoBody.trim() === "") {
        return alert("Введите название и описание задачи");
    }

    const todo = { name: todoText, body: todoBody, completed: false };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });

        if (!response.ok) {
            throw new Error("Failed to add todo");
        }

        const newTodo = await response.json();
        displayTodo(newTodo);
    } catch (error) {
        console.error(error);
    }

    todoInput.value = "";
    bodyInput.value = "";
}

async function getServerTodos() {
    try {
        const response = await fetch(apiUrl);
        const todos = await response.json();
        todos.forEach(displayTodo);
    } catch (error) {
        console.error(error);
    }
}

function updateTask(taskId) {
    const updatedText = prompt('Введите обновленную название:');
    const updatedBody = prompt('Введите обновленную задачу')
    if (updatedText !== null) {
        fetch(`${apiUrl}/${taskId}`, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-type': 'application/json' },
            body: JSON.stringify({ name: updatedText ,body: updatedBody})
        });

        const updatedCard = document.querySelector(`[data-id="${taskId}"]`);
        if (updatedCard) {
            updatedCard.querySelector('.todo-item').innerText = updatedText;
            updatedCard.querySelector('.todoBody-item').innerText = updatedBody;
        }
    }
}

async function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;

    if (item.classList.contains("trash-btn")) {
        const todoId = todo.dataset.id;

        try {
            const response = await fetch(`${apiUrl}/${todoId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete todo");
            }
            todo.remove();
        } catch (error) {
            console.error(error);
        }
    }

    if (item.classList.contains("complete-btn")) {
        const todoId = todo.dataset.id;
        const completed = todo.classList.contains("completed");

        try {
            const response = await fetch(`${apiUrl}/${todoId}?completed=${!completed}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: !completed }),
            });

            if (!response.ok) {
                throw new Error("Failed to update todo");
            }

            todo.classList.toggle("completed");
        } catch (error) {
            console.error(error);
        }
    }

    if (item.classList.contains("editBtn-btn")) {
        const todoId = todo.dataset.id;
        updateTask(todoId);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
                break;
            case "incomplete":
                todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}

function displayTodo(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.dataset.id = todo.id;

    const newTodo = document.createElement("li");
    newTodo.innerText = todo.name;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const newTodoBody = document.createElement("li");
    newTodoBody.innerText = todo.body;
    newTodoBody.classList.add("todoBody-item");
    todoDiv.appendChild(newTodoBody);

    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("editBtn-btn");
    todoDiv.appendChild(editButton);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    if (todo.completed) {
        todoDiv.classList.add("completed");
    }

    todoList.appendChild(todoDiv);
}
