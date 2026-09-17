// Created DOM elements

const input = document.getElementById("task-input");
const addBtn = document.getElementById("Add-btn");
const taskList = document.getElementById("task-list");

// Load Tasks from localStorage (if any available)
const saved = localStorage.getItem("tasks");
const tasks = saved ? JSON.parse(saved) : [];

function saveTasks() {
  // Save tasks to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create a DOM node for a todo item and append it to the list
function createTodoNode(task, index) {
  const li = document.createElement("li");

  // Checkbox for task completion
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!task.completed;
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
    render();
  });

  // Text of the todo task
  const span = document.createElement("span");
  span.textContent = task.text;
  span.style.margin = "0 10px";

  if (task.completed) {
    span.style.textDecoration = "line-through";
  }

  // Double click to edit the task
  span.addEventListener("dblclick", () => {
    const newText = prompt("Edit task:", task.text);
    if (newText !== null && newText.trim() !== "") {
      task.text = newText.trim();
      saveTasks();
      render();
    }
  });

  // Delete button for task removal
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    tasks.splice(index, 1);
    saveTasks();
    render();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  return li;
}

// Render entire todo list from the tasks array
function render() {
  taskList.innerHTML = "";

  // Recreate each item
  tasks.forEach((task, index) => {
    const node = createTodoNode(task, index);
    taskList.appendChild(node);
  });
}

// Add new task to the list
function addTask() {
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    saveTasks();
    render();
    input.value = "";
  }
}

addBtn.addEventListener("click", addTask);

// Allow pressing Enter key to add task
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

render();
