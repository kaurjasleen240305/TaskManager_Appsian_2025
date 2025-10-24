import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { taskService } from '@/services/taskService';
import { useToast } from '@/hooks/use-toast';
import TaskItem from '@/components/TaskItem';
import AddTaskForm from '@/components/AddTaskForm';
import TaskStats from '@/components/TaskStats';
import EmptyState from '@/components/EmptyState';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type FilterType = 'all' | 'active' | 'completed';

const STORAGE_KEY = 'taskManager_tasks';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const { toast } = useToast();

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Could not connect to the API. Make sure your .NET backend is running on the configured endpoint.",
        variant: "destructive",
      });
      console.error('Error fetching tasks:', error);
      // Use mock data for demonstration
      setTasks([
        { id: "1", description: "Connect to your .NET API", isCompleted: false },
        { id: "2", description: "Update API_BASE_URL in taskService.ts", isCompleted: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (description: string) => {
    try {
      setIsAdding(true);
      const newTask = await taskService.createTask({ description });
      setTasks([newTask, ...tasks]);
      toast({
        title: "Task added",
        description: "Your task has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add task. Please try again.",
        variant: "destructive",
      });
      console.error('Error adding task:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      const updatedTask = await taskService.toggleTask(id);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      toast({
        description: updatedTask.isCompleted ? "Task completed! 🎉" : "Task reopened",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
      console.error('Error toggling task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      toast({
        description: "Task deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
      console.error('Error deleting task:', error);
    }
  };

  const completedTasks = tasks.filter(task => task.isCompleted).length;
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true; // 'all'
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />
      
      <div className="relative container max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Task Manager
          </h1>
          <p className="text-muted-foreground">
            Stay organized and get things done
          </p>
        </header>

        <div className="space-y-6">
          <TaskStats total={tasks.length} completed={completedTasks} />
          
          <AddTaskForm onAdd={handleAddTask} isLoading={isAdding} />

          {/* Filter Tabs */}
          {tasks.length > 0 && (
            <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterType)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  All ({tasks.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active ({tasks.length - completedTasks})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedTasks})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredTasks.length === 0 && tasks.length === 0 ? (
            <EmptyState />
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No {filter} tasks found
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            💡 <strong>Backend Setup:</strong> Update <code className="px-2 py-1 bg-muted rounded">API_BASE_URL</code> in{' '}
            <code className="px-2 py-1 bg-muted rounded">src/services/taskService.ts</code> to connect to your .NET API
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
