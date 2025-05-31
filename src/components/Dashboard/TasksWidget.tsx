import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Settings, Plus, GripVertical } from 'lucide-react';

interface Task {
  id: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    description: 'Review and make sure nothing slips through cracks',
    completed: false,
    dueDate: '15 Sep, 2021',
  },
  {
    id: '2',
    description: 'Send meeting invites for sales upcampaign',
    completed: true,
    dueDate: '20 Sep, 2021',
  },
  {
    id: '3',
    description: 'Weekly closed sales won checking with sales team',
    completed: false,
    dueDate: '24 Sep, 2021',
  },
  {
    id: '4',
    description: 'Add notes that can be viewed from the individual view',
    completed: true,
    dueDate: '27 Sep, 2021',
  },
  {
    id: '5',
    description: 'Move stuff to another page',
    completed: false,
    dueDate: '30 Sep, 2021',
  },
];

const TasksWidget: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const totalTasksCount = tasks.length;
  const progressPercentage = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">My Tasks</CardTitle>
        <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button size="sm" className="bg-velzon-accentGreen hover:bg-velzon-accentGreen/90 text-white">
                <Plus className="h-4 w-4 mr-1" /> Add Task
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-xs text-muted-foreground mb-3">
          {completedTasksCount} of {totalTasksCount} remaining
        </CardDescription>
        {totalTasksCount > 0 && (
          <Progress value={progressPercentage} className="w-full h-1.5 mb-4" indicatorClassName="bg-velzon-accentGreen" />
        )}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between group py-1.5">
              <div className="flex items-center">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  className="mr-3 data-[state=checked]:bg-velzon-accentGreen data-[state=checked]:border-velzon-accentGreen"
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    "text-sm font-medium leading-none",
                    task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
                  )}
                >
                  {task.description}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <span className={cn("text-xs", task.completed ? 'text-muted-foreground' : 'text-slate-500')}>{task.dueDate}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TasksWidget;
