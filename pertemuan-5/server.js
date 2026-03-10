const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Data sementara
let todos = [];

// Endpoint GET /api/todos
app.get("/api/todos", (req, res) => {
  res.json({
    success: true,
    message: "Data to-do berhasil diambil",
    data: todos
  });
});

// Endpoint POST /api/todos
app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    text: req.body.text,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json({
    success: true,
    message: "To-do berhasil ditambahkan",
    data: newTodo
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});