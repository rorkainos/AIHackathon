import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, CompletedDay, TodoStore } from '../types';
import { normalizeDate, getNextDay } from '../utils/dateUtils';

const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      completedDays: [],

      addTodo: (todoData) => {
        const dateStr = normalizeDate(todoData.dueDateTime);

        // Check if day is locked
        if (get().isDayCompleted(dateStr)) {
          throw new Error('Cannot add TODO to a completed day');
        }

        const newTodo: Todo = {
          ...todoData,
          id: crypto.randomUUID(),
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },

      updateTodo: (id, updates) => {
        const todo = get().todos.find((t) => t.id === id);
        if (!todo) return;

        const oldDateStr = normalizeDate(todo.dueDateTime);

        // Check if original day is locked
        if (get().isDayCompleted(oldDateStr)) {
          throw new Error('Cannot edit TODO from a completed day');
        }

        // If changing date, check if new date is locked
        if (updates.dueDateTime) {
          const newDateStr = normalizeDate(updates.dueDateTime);
          if (get().isDayCompleted(newDateStr)) {
            throw new Error('Cannot move TODO to a completed day');
          }
        }

        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id
              ? { ...t, ...updates, updatedAt: new Date().toISOString() }
              : t
          ),
        }));
      },

      deleteTodo: (id) => {
        const todo = get().todos.find((t) => t.id === id);
        if (!todo) return;

        const dateStr = normalizeDate(todo.dueDateTime);

        if (get().isDayCompleted(dateStr)) {
          throw new Error('Cannot delete TODO from a completed day');
        }

        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        }));
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id
              ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() }
              : t
          ),
        }));
      },

      completeDay: (date) => {
        const todosForDay = get().getTodosByDate(date);
        const todoIds = todosForDay.map((t) => t.id);

        const unfinishedTodos = todosForDay.filter((t) => !t.completed);
        
        const nextDay = getNextDay(date);

        if (unfinishedTodos.length > 0) {
          set((state) => ({
            todos: state.todos.map((t) => {
              if (unfinishedTodos.some((ut) => ut.id === t.id)) {
                // Keep the same time but change the date
                const currentDateTime = new Date(t.dueDateTime);
                const targetDateTime = new Date(nextDay);
                targetDateTime.setHours(
                  currentDateTime.getHours(),
                  currentDateTime.getMinutes(),
                  currentDateTime.getSeconds(),
                  currentDateTime.getMilliseconds()
                );
                
                return {
                  ...t,
                  dueDateTime: targetDateTime.toISOString(),
                  updatedAt: new Date().toISOString(),
                };
              }
              return t;
            }),
          }));
        }

        const completedDay: CompletedDay = {
          date,
          completedAt: new Date().toISOString(),
          todoIds,
        };

        set((state) => ({
          completedDays: [...state.completedDays, completedDay],
        }));
      },

      getTodosByDate: (date) => {
        const dateStr = normalizeDate(date);
        return get().todos.filter((todo) => {
          const todoDateStr = normalizeDate(todo.dueDateTime);
          return todoDateStr === dateStr;
        });
      },

      isDayCompleted: (date) => {
        const dateStr = normalizeDate(date);
        return get().completedDays.some((day) => day.date === dateStr);
      },

      getTodosForDateRange: (startDate, endDate) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();

        const filteredTodos = get().todos.filter((todo) => {
          const todoTime = new Date(todo.dueDateTime).getTime();
          return todoTime >= start && todoTime <= end;
        });

        // Group by date
        return filteredTodos.reduce(
          (acc, todo) => {
            const dateStr = normalizeDate(todo.dueDateTime);
            if (!acc[dateStr]) {
              acc[dateStr] = [];
            }
            acc[dateStr].push(todo);
            return acc;
          },
          {} as Record<string, Todo[]>
        );
      },
    }),
    {
      name: 'todo-storage', // localStorage key
    }
  )
);

export default useTodoStore;
