const API_URL = "http://localhost:3000/api/todos";
let currentFilter = "all";
let tasks = [];

async function fetchTodos() {
  const res = await fetch(API_URL);
  const result = await res.json();
  tasks = result.data; // ambil array dari response
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;

    li.appendChild(span);
    taskList.appendChild(li);
  });

  document.getElementById("taskCount").textContent =
    `${tasks.filter(t => !t.completed).length} tugas`;
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Tugas tidak boleh kosong!");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  input.value = "";
  fetchTodos();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function deleteCompleted() {
  tasks = tasks.filter(task => !task.completed);
  renderTasks();
}

fetchTodos();