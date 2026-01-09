import React, { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  format,
  isSameMonth,
} from 'date-fns';
import { Todo } from '../../types';
import { CalendarDay } from './CalendarDay';
import { Button } from '../common/Button';
import { normalizeDate } from '../../utils/dateUtils';

interface CalendarViewProps {
  todos: Todo[];
  completedDays: Set<string>;
  onDayClick: (date: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  todos,
  completedDays,
  onDayClick,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const handlePrevMonth = () => setCurrentDate((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));
  const handleToday = () => setCurrentDate(new Date());

  // Group todos by date for quick lookup
  const todosByDate: Record<string, Todo[]> = {};
  todos.forEach((todo) => {
    const dateStr = normalizeDate(todo.dueDateTime);
    if (!todosByDate[dateStr]) {
      todosByDate[dateStr] = [];
    }
    todosByDate[dateStr].push(todo);
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handlePrevMonth}>
            ← Prev
          </Button>
          <Button variant="secondary" size="sm" onClick={handleToday}>
            Today
          </Button>
          <Button variant="secondary" size="sm" onClick={handleNextMonth}>
            Next →
          </Button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dateStr = normalizeDate(day);
          const dayTodos = todosByDate[dateStr] || [];
          const isCompleted = completedDays.has(dateStr);
          const isCurrentMonth = isSameMonth(day, monthStart);

          return (
            <CalendarDay
              key={dateStr}
              date={dateStr}
              todos={dayTodos}
              isCompleted={isCompleted}
              isCurrentMonth={isCurrentMonth}
              onClick={() => onDayClick(dateStr)}
            />
          );
        })}
      </div>
    </div>
  );
};
