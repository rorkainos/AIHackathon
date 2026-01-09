import React from 'react';
import { Todo } from '../../types';
import { TodoList } from '../todo/TodoList';

interface TimelineGroupProps {
  date: string;
  todos: Todo[];
  isLocked: boolean;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onCompleteDay: () => void;
}

export const TimelineGroup: React.FC<TimelineGroupProps> = ({
  date,
  todos,
  isLocked,
  onEdit,
  onDelete,
  onToggle,
  onCompleteDay,
}) => {
  return (
    <div className="relative pb-8">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-2.5" />

      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-2 w-2 h-2 rounded-full transform -translate-x-2.5 ${
          isLocked ? 'bg-yellow-400' : 'bg-blue-400'
        }`}
      />

      {/* Content */}
      <div className="pl-6">
        <TodoList
          todos={todos}
          date={date}
          isLocked={isLocked}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
          onCompleteDay={onCompleteDay}
        />
      </div>
    </div>
  );
};
