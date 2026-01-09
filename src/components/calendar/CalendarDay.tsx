import React from 'react';
import { Todo } from '../../types';
import { getTodayDate } from '../../utils/dateUtils';

interface CalendarDayProps {
  date: string;
  todos: Todo[];
  isCompleted: boolean;
  isCurrentMonth: boolean;
  onClick: () => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  todos,
  isCompleted,
  isCurrentMonth,
  onClick,
}) => {
  const dayNumber = parseInt(date.split('-')[2]);
  const today = getTodayDate();
  const isToday = date === today;

  const hasTodos = todos.length > 0;

  return (
    <button
      onClick={onClick}
      className={`
        aspect-square p-2 rounded-lg border-2 transition-colors text-sm
        ${
          isCurrentMonth
            ? 'bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-300'
            : 'bg-gray-50 border-gray-100'
        }
        ${isToday ? 'border-blue-500 bg-blue-50' : ''}
        ${isCompleted ? 'border-yellow-300 bg-yellow-50' : ''}
      `}
    >
      <div className={`font-semibold mb-1 ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
        {dayNumber}
      </div>

      {/* TODO count badge */}
      {hasTodos && (
        <div className="text-xs">
          {isCompleted ? (
            <div className="inline-flex items-center gap-0.5">
              <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <div className="bg-blue-100 text-blue-700 rounded-full px-1.5 py-0.5 font-semibold">
              {todos.length}
            </div>
          )}
        </div>
      )}
    </button>
  );
};
