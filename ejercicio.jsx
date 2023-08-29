const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [
  { id: 1, description: 'Comprar víveres', done: false },
  { id: 2, description: 'Hacer ejercicio', done: true }
];


app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Crear 
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Actualizar 
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  tasks = tasks.map(task => task.id === taskId ? { ...task, ...updatedTask } : task);
  res.json(tasks.find(task => task.id === taskId));
});

// Eliminar 
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
