import { useState } from 'react';
import type { Priority } from '../types';

interface TaskFormProps {
  onAdd: (title: string, priority: Priority, dueDate: string | null) => boolean;
  error: string | null;
  clearError: () => void;
}

export function TaskForm({ onAdd, error, clearError }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAdd(title, priority, dueDate || null);
    if (success) {
      setTitle('');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) clearError();
          }}
          placeholder="Nueva tarea..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
            if (error) clearError();
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Agregar
        </button>
      </div>
    </form>
  );
}
