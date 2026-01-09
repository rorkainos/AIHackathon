import React from 'react';
import { Button } from '../common/Button';
import { ViewMode } from '../../types';

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddTodo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ viewMode, onViewModeChange, onAddTodo }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">TODO App</h1>
            <p className="text-gray-600 text-sm mt-1">Stay organized and focused</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* View mode toggle */}
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'calendar' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => onViewModeChange('calendar')}
                className="rounded-md"
              >
                Calendar
              </Button>
              <Button
                variant={viewMode === 'timeline' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => onViewModeChange('timeline')}
                className="rounded-md"
              >
                Timeline
              </Button>
            </div>

            {/* Add TODO button */}
            <Button variant="primary" onClick={onAddTodo}>
              + Add TODO
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
