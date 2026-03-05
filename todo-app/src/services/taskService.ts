import type { Task, Priority, FilterState } from '../types';

const STORAGE_KEY = 'todo-tasks';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function createTask(title: string, priority: Priority, dueDate: string | null): Task {
  return {
    id: generateId(),
    title: title.trim(),
    completed: false,
    priority,
    dueDate,
    createdAt: new Date().toISOString(),
  };
}

export function validateTask(title: string, dueDate: string | null): string | null {
  if (!title.trim()) {
    return 'La tarea no puede estar vacía';
  }
  if (dueDate) {
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (due < today) {
      return 'No se permiten fechas pasadas';
    }
  }
  return null;
}

export function filterTasks(tasks: Task[], filters: FilterState): Task[] {
  return tasks.filter((task) => {
    if (filters.status === 'completed' && !task.completed) return false;
    if (filters.status === 'pending' && task.completed) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    return true;
  });
}

export function sortTasksByDueDate(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
}

export function loadTasksFromStorage(): Task[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is Task =>
        item &&
        typeof item.id === 'string' &&
        typeof item.title === 'string' &&
        typeof item.completed === 'boolean' &&
        ['low', 'medium', 'high'].includes(item.priority)
    );
  } catch {
    return [];
  }
}

export function saveTasksToStorage(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    console.error('Error al guardar en localStorage');
  }
}
