import { useState } from 'react';
import useTodoStore from './store/useTodoStore';
import { Todo, ViewMode } from './types';
import { Layout } from './components/layout/Layout';
import { Header } from './components/layout/Header';
import { Modal } from './components/common/Modal';
import { ConfirmDialog } from './components/common/ConfirmDialog';
import { TodoForm } from './components/todo/TodoForm';
import { CalendarView } from './components/calendar/CalendarView';
import { TimelineView } from './components/timeline/TimelineView';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    type: 'delete' | 'completeDay';
    todoId?: string;
    date?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Store hooks
  const todos = useTodoStore((state) => state.todos);
  const completedDays = useTodoStore((state) => state.completedDays);
  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const completeDay = useTodoStore((state) => state.completeDay);

  // Convert completed days array to Set for quick lookup
  const completedDaysSet = new Set(completedDays.map((d) => d.date));

  // Handle adding a new TODO
  const handleAddTodo = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
    setError(null);
  };

  // Handle editing a TODO
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
    setError(null);
  };

  // Handle form submit
  const handleFormSubmit = (
    data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>
  ) => {
    try {
      if (editingTodo) {
        updateTodo(editingTodo.id, data);
      } else {
        addTodo(data);
      }
      setIsFormOpen(false);
      setEditingTodo(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save TODO');
    }
  };

  // Handle delete TODO
  const handleDeleteTodo = () => {
    if (confirmDialog?.type === 'delete' && confirmDialog?.todoId) {
      try {
        deleteTodo(confirmDialog.todoId);
        setConfirmDialog(null);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete TODO');
      }
    }
  };

  // Handle complete day
  const handleCompleteDay = () => {
    if (confirmDialog?.type === 'completeDay' && confirmDialog?.date) {
      try {
        completeDay(confirmDialog.date);
        setConfirmDialog(null);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to complete day');
      }
    }
  };

  // Handle day click in calendar
  const handleDayClick = () => {
    setViewMode('timeline');
  };

  return (
    <Layout>
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddTodo={handleAddTodo}
      />

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {viewMode === 'calendar' ? (
        <CalendarView
          todos={todos}
          completedDays={completedDaysSet}
          onDayClick={handleDayClick}
        />
      ) : (
        <TimelineView
          todos={todos}
          completedDays={completedDaysSet}
          onEdit={handleEditTodo}
          onDelete={(id) => setConfirmDialog({ type: 'delete', todoId: id })}
          onToggle={toggleTodo}
          onCompleteDay={(date) => {
            if (!completedDaysSet.has(date)) {
              setConfirmDialog({ type: 'completeDay', date });
            }
          }}
        />
      )}

      {/* Add/Edit TODO Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTodo(null);
        }}
        title={editingTodo ? 'Edit TODO' : 'Add New TODO'}
      >
        <TodoForm
          mode={editingTodo ? 'edit' : 'create'}
          initialData={editingTodo || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingTodo(null);
          }}
        />
      </Modal>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        isOpen={confirmDialog?.type === 'delete'}
        title="Delete TODO"
        message="Are you sure you want to delete this TODO? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isDangerous={true}
        onConfirm={handleDeleteTodo}
        onCancel={() => setConfirmDialog(null)}
      />

      <ConfirmDialog
        isOpen={confirmDialog?.type === 'completeDay'}
        title="Complete Day"
        message="Once you complete this day, you won't be able to add or modify TODOs for it. Are you sure?"
        confirmLabel="Complete"
        cancelLabel="Cancel"
        isDangerous={true}
        onConfirm={handleCompleteDay}
        onCancel={() => setConfirmDialog(null)}
      />
    </Layout>
  );
}

export default App;
