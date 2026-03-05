import type { Task, Priority } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, priority: Priority, dueDate: string | null) => boolean;
}

export function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No hay tareas. ¡Agrega una nueva!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="animate-fade-in"
        >
          <TaskItem task={task} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
        </div>
      ))}
    </div>
  );
}

import { TaskItem } from './TaskItem';
