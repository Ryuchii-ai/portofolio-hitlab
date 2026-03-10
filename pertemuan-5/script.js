const API_URL = "http://localhost:3000/api/todos";
let currentFilter = "all";
let tasks = [];

// Ambil data dari server
async function fetchTodos() {
  const res = await fetch(API_URL);
  tasks = await res.json();
  renderTasks();
}

// Render daftar tugas
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (currentFilter === "active") return !task.done;
    if (currentFilter === "completed") return task.done;
    return true; // all
  });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.done ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.task;

    li.appendChild(span);
    taskList.appendChild(li);
  });

  document.getElementById("taskCount").textContent =
    `${tasks.filter(t => !t.done).length} tugas`;
}

// Tambah tugas baru
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
    body: JSON.stringify({ task: text })
  });

  input.value = "";
  fetchTodos(); // refresh daftar
}

// Filter
function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

// Hapus yang selesai (butuh endpoint tambahan di backend)
function deleteCompleted() {
  tasks = tasks.filter(task => !task.done);
  renderTasks();
}

// Load pertama kali
fetchTodos();