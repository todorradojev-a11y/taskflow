import fs from 'fs';
import path from 'path';
import { Task } from './types';

const DB_PATH = path.join(__dirname, '..', 'data', 'tasks.json');

export function readTasks(): Task[] {
  if (!fs.existsSync(DB_PATH)) return [];
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return raw ? JSON.parse(raw) : [];
}

export function writeTasks(tasks: Task[]): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(tasks, null, 2));
}
