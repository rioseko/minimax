import { useState } from 'react';
import type { Task, Priority } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, priority: Priority, dueDate: string | null) => boolean;
}

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
};

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState<Priority>(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const handleSave = () => {
    const success = onUpdate(task.id, editTitle, editPriority, editDueDate || null);
    if (success) setIsEditing(false);
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 transition-colors ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
        }`}
      >
        {task.completed && '✓'}
      </button>

      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${priorityColors[task.priority]}`} />

      {isEditing ? (
        <div className="flex-1 flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 min-w-[120px] px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as Priority)}
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          />
          <button onClick={handleSave} className="px-3 py-1 bg-green-600 text-white rounded text-sm">
            Guardar
          </button>
          <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
            Cancelar
          </button>
        </div>
      ) : (
        <div className="flex-1 min-w-0">
          <p className={`truncate ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </p>
          {task.dueDate && (
            <p className="text-xs text-gray-500 dark:text-gray-400">Vence: {task.dueDate}</p>
          )}
        </div>
      )}

      {!isEditing && (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
}
