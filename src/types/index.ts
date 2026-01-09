// Todo item interface
export interface Todo {
  id: string;                    // UUID
  title: string;
  description: string;
  dueDateTime: string;           // ISO 8601 format
  completed: boolean;
  createdAt: string;             // ISO 8601 format
  updatedAt: string;             // ISO 8601 format
}

// Completed day tracking
export interface CompletedDay {
  date: string;                  // YYYY-MM-DD format
  completedAt: string;           // ISO 8601 format
  todoIds: string[];             // IDs of TODOs archived on this day
}

// Countdown display state
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOverdue: boolean;
  totalSeconds: number;
}

// View mode for the application
export type ViewMode = 'calendar' | 'timeline';

// Zustand store interface
export interface TodoStore {
  todos: Todo[];
  completedDays: CompletedDay[];

  // CRUD operations
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => void;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  completeDay: (date: string) => void;

  // Selectors
  getTodosByDate: (date: string) => Todo[];
  isDayCompleted: (date: string) => boolean;
  getTodosForDateRange: (startDate: string, endDate: string) => Record<string, Todo[]>;
}
