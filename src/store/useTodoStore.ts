import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, CompletedDay, TodoStore, RecurrenceFrequency } from '../types';
import { normalizeDate } from '../utils/dateUtils';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';

const getNextDueDateTime = (dueDateTime: string, frequency: RecurrenceFrequency): string => {
  const current = new Date(dueDateTime);

  const next = (() => {
    switch (frequency) {
      case 'daily':
        return addDays(current, 1);
      case 'weekly':
        return addWeeks(current, 1);
      case 'monthly':
        return addMonths(current, 1);
      case 'yearly':
        return addYears(current, 1);
      default: {
        const exhaustiveCheck: never = frequency;
        return exhaustiveCheck;
      }
    }
  })();

  return next.toISOString();
};

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
        const existing = get().todos.find((t) => t.id === id);
        if (!existing) return;

        const dateStr = normalizeDate(existing.dueDateTime);
        if (get().isDayCompleted(dateStr)) {
          throw new Error('Cannot modify TODO from a completed day');
        }

        const isCompleting = !existing.completed;

        // First: toggle completion state
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id
              ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() }
              : t
          ),
        }));

        // Then: if completing a recurring TODO, generate next occurrence
        if (isCompleting && existing.recurrence) {
          const nextDueDateTime = getNextDueDateTime(
            existing.dueDateTime,
            existing.recurrence.frequency
          );

          // Avoid creating duplicates if the user toggles completion multiple times
          const alreadyExists = get().todos.some(
            (t) =>
              t.dueDateTime === nextDueDateTime &&
              t.title === existing.title &&
              t.description === existing.description &&
              t.recurrence?.frequency === existing.recurrence?.frequency &&
              (t.recurrence?.endDate || '') === (existing.recurrence?.endDate || '')
          );
          if (alreadyExists) {
            return;
          }

          // If endDate is set, only create next occurrence if next date is <= endDate
          if (existing.recurrence.endDate) {
            const nextDateStr = normalizeDate(nextDueDateTime);
            if (nextDateStr.localeCompare(existing.recurrence.endDate) > 0) {
              return;
            }
          }

          const nextDateStr = normalizeDate(nextDueDateTime);

          // Respect locked days: if next occurrence falls on a completed day, skip creation.
          if (get().isDayCompleted(nextDateStr)) {
            return;
          }

          const newTodo: Todo = {
            id: crypto.randomUUID(),
            title: existing.title,
            description: existing.description,
            dueDateTime: nextDueDateTime,
            completed: false,
            recurrence: existing.recurrence,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set((state) => ({
            todos: [...state.todos, newTodo],
          }));
        }
      },

      completeDay: (date) => {
        const todosForDay = get().getTodosByDate(date);
        const todoIds = todosForDay.map((t) => t.id);

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
