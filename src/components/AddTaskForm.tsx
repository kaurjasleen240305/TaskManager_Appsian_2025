import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface AddTaskFormProps {
  onAdd: (description: string) => void;
  isLoading: boolean;
}

const AddTaskForm = ({ onAdd, isLoading }: AddTaskFormProps) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onAdd(description.trim());
      setDescription('');
    }
  };

  return (
    <Card className="p-4 shadow-soft border-border bg-card">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-background border-input"
          maxLength={200}
        />
        <Button
          type="submit"
          disabled={!description.trim() || isLoading}
          className="bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </form>
    </Card>
  );
};

export default AddTaskForm;
