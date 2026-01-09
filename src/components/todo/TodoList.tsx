import React from 'react';
import { Todo } from '../../types';
import { TodoItem } from './TodoItem';
import { Button } from '../common/Button';
import { formatDateFull } from '../../utils/dateUtils';

interface TodoListProps {
  todos: Todo[];
  date: string;
  isLocked: boolean;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onCompleteDay: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  date,
  isLocked,
  onEdit,
  onDelete,
  onToggle,
  onCompleteDay,
}) => {
  const sortedTodos = [...todos].sort((a, b) => {
    // Completed TODOs at the bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then by due date
    return new Date(a.dueDateTime).getTime() - new Date(b.dueDateTime).getTime();
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{formatDateFull(date)}</h2>
        {isLocked && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
            <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-yellow-800">Day Completed</span>
          </div>
        )}
      </div>

      {/* TODOs */}
      {sortedTodos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No TODOs for this day</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isLocked={isLocked}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}

      {/* Complete Day Button */}
      {!isLocked && sortedTodos.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <Button variant="primary" onClick={onCompleteDay} fullWidth>
            Complete Day
          </Button>
        </div>
      )}
    </div>
  );
};
