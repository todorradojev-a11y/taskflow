import express from 'express';
import cors from 'cors';
import { readTasks, writeTasks } from './db';
import { Task } from './types';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// GET all tasks (supports ?status=active|completed, ?priority=, ?search=)
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  const { status, priority, search } = req.query;

  let filtered = tasks;
  if (status === 'completed') filtered = filtered.filter((t) => t.completed);
  if (status === 'active') filtered = filtered.filter((t) => !t.completed);
  if (priority) filtered = filtered.filter((t) => t.priority === priority);
  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter((t) => t.title.toLowerCase().includes(q));
  }

  res.json(filtered);
});

// GET single task
app.get('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST create task
app.post('/api/tasks', (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const tasks = readTasks();
  const newTask: Task = {
    id: Date.now().toString(),
    title,
    description: description || '',
    priority: priority || 'medium',
    dueDate: dueDate || null,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  tasks[index] = { ...tasks[index], ...req.body };
  writeTasks(tasks);
  res.json(tasks[index]);
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const filtered = tasks.filter((t) => t.id !== req.params.id);
  if (filtered.length === tasks.length) return res.status(404).json({ error: 'Task not found' });

  writeTasks(filtered);
  res.status(204).send();
});

// GET stats
app.get('/api/stats', (req, res) => {
  const tasks = readTasks();
  res.json({
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    active: tasks.filter((t) => !t.completed).length,
  });
});

app.listen(PORT, () => console.log(`TaskFlow API running on http://localhost:${PORT}`));
