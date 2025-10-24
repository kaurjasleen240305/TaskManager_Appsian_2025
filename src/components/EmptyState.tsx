import { CheckCircle2 } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 p-4 rounded-full bg-gradient-primary/10">
        <CheckCircle2 className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">No tasks yet</h3>
      <p className="text-muted-foreground max-w-sm">
        Get started by adding your first task above. Stay organized and productive!
      </p>
    </div>
  );
};

export default EmptyState;
