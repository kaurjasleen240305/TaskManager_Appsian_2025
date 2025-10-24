import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Task } from '@/types/task';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <Card 
      className={cn(
        "p-4 transition-all duration-300 hover:shadow-soft",
        "border-border bg-card",
        task.isCompleted && "opacity-70"
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.isCompleted}
          onCheckedChange={() => onToggle(task.id)}
          className="h-5 w-5"
        />
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            "flex-1 text-base cursor-pointer transition-all duration-200",
            task.isCompleted && "line-through text-muted-foreground"
          )}
        >
          {task.description}
        </label>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
          aria-label="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default TaskItem;
