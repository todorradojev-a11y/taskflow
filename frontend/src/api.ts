import { Task } from './types';

const BASE_URL = '/api/tasks';

export async function fetchTasks(filters: Record<string, string> = {}): Promise<Task[]> {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}${params ? `?${params}` : ''}`);
  return res.json();
}

export async function createTask(data: Partial<Task>): Promise<Task> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
}
