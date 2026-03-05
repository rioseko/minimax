import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { FilterBar } from './components/FilterBar';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const {
    tasks,
    filters,
    setFilters,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    error,
    clearError,
    isLoading,
    pendingCount,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mis Tareas</h1>
          <ThemeToggle />
        </div>

        <TaskForm onAdd={addTask} error={error} clearError={clearError} />

        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          pendingCount={pendingCount}
        />

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
