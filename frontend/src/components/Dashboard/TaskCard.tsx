import { Task } from '../../types';
import { Check, Trash2, Calendar, Flag } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import Button from '../UI/Button';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all hover:shadow-md ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => onToggleComplete(task.id, !task.completed)}
            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-primary-500'
            }`}
          >
            {task.completed && <Check className="w-3 h-3 text-white" />}
          </button>
          <div className="flex-1">
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
              {task.due_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(task.due_date)}</span>
                </div>
              )}
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                <Flag className="w-3 h-3 inline mr-1" />
                {task.priority}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
