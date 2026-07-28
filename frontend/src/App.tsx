import { useEffect, useState } from 'react';
import { Task, Priority } from './types';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';

const priorityColors: Record<Priority, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [search, setSearch] = useState('');

  const loadTasks = async () => {
    const filters: Record<string, string> = {};
    if (filter !== 'all') filters.status = filter;
    if (search) filters.search = search;
    const data = await fetchTasks(filters);
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask({ title, description, priority, dueDate: dueDate || null });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    loadTasks();
  };

  const toggleComplete = async (task: Task) => {
    await updateTask(task.id, { completed: !task.completed });
    loadTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-1">TaskFlow</h1>
        <p className="text-slate-500 mb-6">
          Jednostavan task manager — React, Express, Node.js, TypeScript
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-5 mb-6 space-y-3">
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Naziv zadatka"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Opis (opciono)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-wrap gap-3">
            <select
              className="border rounded-lg px-3 py-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="low">Nizak prioritet</option>
              <option value="medium">Srednji prioritet</option>
              <option value="high">Visok prioritet</option>
            </select>
            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit" className="ml-auto bg-slate-800 text-white px-4 py-2 rounded-lg">
              Dodaj
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <input
            className="flex-1 border rounded-lg px-3 py-2 min-w-[150px]"
            placeholder="Pretraga zadataka..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-sm ${
                filter === f ? 'bg-slate-800 text-white' : 'bg-white border'
              }`}
            >
              {f === 'all' ? 'Sve' : f === 'active' ? 'Aktivno' : 'Završeno'}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-lg shadow-sm p-4 flex items-start gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
                className="mt-1"
              />
              <div className="flex-1">
                <div
                  className={`font-medium ${
                    task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                  }`}
                >
                  {task.title}
                </div>
                {task.description && (
                  <div className="text-sm text-slate-500">{task.description}</div>
                )}
                <div className="flex gap-2 mt-2 items-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="text-xs text-slate-400">Rok: {task.dueDate}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-slate-400 hover:text-red-500 text-sm"
              >
                Obriši
              </button>
            </div>
          ))}
          {tasks.length === 0 && <p className="text-slate-400 text-center py-8">Nema zadataka.</p>}
        </div>

        <p className="text-sm text-slate-400 mt-6 text-center">
          {completedCount} od {tasks.length} zadataka završeno
        </p>
      </div>
    </div>
  );
}
