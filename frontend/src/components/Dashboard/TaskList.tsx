import { useState } from 'react';
import { Task, TaskCreate } from '../../types';
import { useTasks } from '../../hooks/useTasks';
import TaskCard from './TaskCard';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import { Plus } from 'lucide-react';

interface TaskListProps {
  projectId?: number;
  filterCompleted?: boolean;
}

export default function TaskList({ projectId, filterCompleted }: TaskListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  
  const { tasks, loading, error, createTask, deleteTask, toggleTaskComplete } = useTasks(projectId, filterCompleted);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const taskData: TaskCreate = {
      title: newTaskTitle,
      description: newTaskDescription || undefined,
      priority: newTaskPriority,
      project_id: projectId,
    };

    try {
      await createTask(taskData);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskPriority('medium');
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {filterCompleted === false ? 'Pending Tasks' : filterCompleted === true ? 'Completed Tasks' : 'All Tasks'}
          <span className="ml-2 text-sm font-normal text-gray-500">({tasks.length})</span>
        </h2>
        <Button
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Create your first task!
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            label="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
