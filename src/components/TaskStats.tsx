import { CheckCircle2, ListTodo } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TaskStatsProps {
  total: number;
  completed: number;
}

const TaskStats = ({ total, completed }: TaskStatsProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4 bg-card border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <ListTodo className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <p className="text-2xl font-bold text-foreground">{total}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-card border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <CheckCircle2 className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-foreground">
              {completed} 
              <span className="text-sm text-muted-foreground ml-1">({percentage}%)</span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskStats;
