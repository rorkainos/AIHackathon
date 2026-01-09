import React, { useMemo } from 'react';
import { Todo } from '../../types';
import { TimelineGroup } from './TimelineGroup';
import { normalizeDate, getTodayDate } from '../../utils/dateUtils';

interface TimelineViewProps {
  todos: Todo[];
  completedDays: Set<string>;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onCompleteDay: (date: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  todos,
  completedDays,
  onEdit,
  onDelete,
  onToggle,
  onCompleteDay,
}) => {
  // Group todos by date and sort chronologically
  const groupedTodos = useMemo(() => {
    const groups: Record<string, Todo[]> = {};

    todos.forEach((todo) => {
      const dateStr = normalizeDate(todo.dueDateTime);
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(todo);
    });

    // Sort by date
    return Object.entries(groups)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, todoList]) => ({ date, todos: todoList }));
  }, [todos]);

  const todayDate = getTodayDate();
  const todayIndex = groupedTodos.findIndex((g) => g.date === todayDate);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Timeline</h2>
        {todayIndex !== -1 && (
          <button
            onClick={() => {
              const element = document.getElementById(`timeline-group-${todayDate}`);
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Jump to Today
          </button>
        )}
      </div>

      {groupedTodos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No TODOs yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedTodos.map(({ date, todos: dateTodos }) => (
            <div key={date} id={`timeline-group-${date}`}>
              <TimelineGroup
                date={date}
                todos={dateTodos}
                isLocked={completedDays.has(date)}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle}
                onCompleteDay={() => onCompleteDay(date)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
