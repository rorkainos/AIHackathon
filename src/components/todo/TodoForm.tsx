import React, { useState } from 'react';
import { RecurrenceFrequency, Todo } from '../../types';
import { Button } from '../common/Button';

interface TodoFormProps {
  mode: 'create' | 'edit';
  initialData?: Todo;
  onSubmit: (data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => void;
  onCancel: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ mode, initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDateTime, setDueDateTime] = useState(
    initialData ? initialData.dueDateTime.slice(0, 16) : ''
  );
  const [isRecurring, setIsRecurring] = useState(Boolean(initialData?.recurrence));
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<RecurrenceFrequency>(
    initialData?.recurrence?.frequency || 'weekly'
  );
  const [recurrenceEndDate, setRecurrenceEndDate] = useState(
    initialData?.recurrence?.endDate || ''
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!dueDateTime) {
      setError('Due date and time are required');
      return;
    }

    if (isRecurring && recurrenceEndDate) {
      const dueDateStr = new Date(dueDateTime).toISOString().slice(0, 10);
      if (recurrenceEndDate.localeCompare(dueDateStr) < 0) {
        setError('Recurrence end date cannot be before the due date');
        return;
      }
    }

    try {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        dueDateTime: new Date(dueDateTime).toISOString(),
        recurrence: isRecurring
          ? {
              frequency: recurrenceFrequency,
              endDate: recurrenceEndDate || undefined,
            }
          : undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save TODO');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details (optional)"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Due Date/Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date & Time</label>
        <input
          type="datetime-local"
          value={dueDateTime}
          onChange={(e) => setDueDateTime(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Recurrence */}
      <div className="border border-gray-200 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <input
            id="todo-recurring"
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded cursor-pointer"
          />
          <label htmlFor="todo-recurring" className="text-sm font-medium text-gray-700">
            Recurring
          </label>
        </div>

        {isRecurring && (
          <div className="mt-3 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                value={recurrenceFrequency}
                onChange={(e) => setRecurrenceFrequency(e.target.value as RecurrenceFrequency)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date (optional)
              </label>
              <input
                type="date"
                value={recurrenceEndDate}
                onChange={(e) => setRecurrenceEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-1 text-xs text-gray-500">
                Leave blank to repeat indefinitely.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {mode === 'create' ? 'Add TODO' : 'Update TODO'}
        </Button>
      </div>
    </form>
  );
};
