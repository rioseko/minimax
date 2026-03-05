export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate: string | null;
  createdAt: string;
}

export type FilterStatus = 'all' | 'completed' | 'pending';

export interface FilterState {
  status: FilterStatus;
  priority: Priority | 'all';
}
