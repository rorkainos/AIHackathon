import React from 'react';
import { Todo } from '../../types';
import { Button } from '../common/Button';
import { CountdownTimer } from './CountdownTimer';
import { formatDateTime } from '../../utils/dateUtils';
import { getUrgencyBorderColor } from '../../utils/countdownUtils';
import { useCountdown } from '../../hooks/useCountdown';

interface TodoItemProps {
  todo: Todo;
  isLocked: boolean;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isLocked,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const countdown = useCountdown(todo.dueDateTime);
  const borderColor = getUrgencyBorderColor(countdown);

  return (
    <div
      className={`border-l-4 ${borderColor} bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex gap-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            disabled={isLocked}
            className="w-5 h-5 text-blue-600 rounded cursor-pointer"
          />
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <div
            className={`text-lg font-semibold ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {todo.title}
          </div>

          {todo.description && (
            <p className={`text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}

          <div className="mt-2 text-xs text-gray-500">
            Due: {formatDateTime(todo.dueDateTime)}
          </div>

          {/* Countdown Timer */}
          <div className="mt-2">
            <CountdownTimer dueDateTime={todo.dueDateTime} compact />
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex gap-2">
          {!isLocked && (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(todo)}
                className="!px-3 !py-1"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(todo.id)}
                className="!px-3 !py-1"
              >
                Delete
              </Button>
            </>
          )}
          {isLocked && (
            <div className="text-xs text-gray-500 text-right">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
