import { useState, useCallback, useMemo } from 'react';
import type { Task, Priority, FilterState } from '../types';
import {
  createTask,
  validateTask,
  filterTasks,
  sortTasksByDueDate,
  loadTasksFromStorage,
  saveTasksToStorage,
} from '../services/taskService';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromStorage);
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    priority: 'all',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => setIsLoading(false), 500);

  const addTask = useCallback((title: string, priority: Priority, dueDate: string | null) => {
    const validationError = validateTask(title, dueDate);
    if (validationError) {
      setError(validationError);
      return false;
    }
    const newTask = createTask(title, priority, dueDate);
    setTasks((prev) => {
      const updated = [...prev, newTask];
      saveTasksToStorage(updated);
      return updated;
    });
    setError(null);
    return true;
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      saveTasksToStorage(updated);
      return updated;
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => {
      const updated = prev.filter((task) => task.id !== id);
      saveTasksToStorage(updated);
      return updated;
    });
  }, []);

  const updateTask = useCallback((id: string, title: string, priority: Priority, dueDate: string | null) => {
    const validationError = validateTask(title, dueDate);
    if (validationError) {
      setError(validationError);
      return false;
    }
    setTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === id ? { ...task, title: title.trim(), priority, dueDate } : task
      );
      saveTasksToStorage(updated);
      return updated;
    });
    setError(null);
    return true;
  }, []);

  const filteredTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);
    return sortTasksByDueDate(filtered);
  }, [tasks, filters]);

  const pendingCount = useMemo(() => tasks.filter((t) => !t.completed).length, [tasks]);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filters,
    setFilters,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    error,
    clearError: () => setError(null),
    isLoading,
    pendingCount,
  };
}
