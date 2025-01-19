export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'BAU' | 'Ad Hoc' | 'Project';

export interface Task {
  id: string;
  title: string;
  description: string;
  timeSpent: number; // in minutes
  priority: TaskPriority;
  category: TaskCategory;
  reference?: string;
  createdAt: Date;
  completedAt?: Date;
  userId: string;
}