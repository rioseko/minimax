import type { FilterState, Priority, FilterStatus } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  pendingCount: number;
}

export function FilterBar({ filters, onFilterChange, pendingCount }: FilterBarProps) {
  const handleStatusChange = (status: FilterStatus) => {
    onFilterChange({ ...filters, status });
  };

  const handlePriorityChange = (priority: Priority | 'all') => {
    onFilterChange({ ...filters, priority });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex gap-2">
        {(['all', 'pending', 'completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filters.status === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {status === 'all' ? 'Todas' : status === 'pending' ? 'Pendientes' : 'Completadas'}
          </button>
        ))}
      </div>

      <select
        value={filters.priority}
        onChange={(e) => handlePriorityChange(e.target.value as Priority | 'all')}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
      >
        <option value="all">Todas las prioridades</option>
        <option value="high">Alta</option>
        <option value="medium">Media</option>
        <option value="low">Baja</option>
      </select>

      <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium">{pendingCount}</span> tarea{pendingCount !== 1 ? 's' : ''} pendiente{pendingCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
