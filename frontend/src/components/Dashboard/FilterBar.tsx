import { Filter } from 'lucide-react';
import Button from '../UI/Button';

interface FilterBarProps {
  filter: 'all' | 'pending' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
}

export default function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2">
      <Filter className="w-5 h-5 text-gray-500" />
      <div className="flex gap-1">
        <Button
          size="sm"
          variant={filter === 'all' ? 'primary' : 'ghost'}
          onClick={() => onFilterChange('all')}
        >
          All
        </Button>
        <Button
          size="sm"
          variant={filter === 'pending' ? 'primary' : 'ghost'}
          onClick={() => onFilterChange('pending')}
        >
          Pending
        </Button>
        <Button
          size="sm"
          variant={filter === 'completed' ? 'primary' : 'ghost'}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
