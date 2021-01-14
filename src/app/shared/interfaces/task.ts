import { User } from './user';

export interface Task {
  id: string;
  summary: string;
  type: string;
  status: string;
  priority: string;
  creator: User;
  assignee: User;
  reporter: User;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  descriptionHTML: string;
  description: string;
}

export const taskData = {
  type: {
    TASK: 'TASK',
    BUG: 'BUG',
    ISSUE: 'ISSUE',
    EPIC: 'EPIC',
    FEATURE: 'FEATURE',
    IMPROVEMENT: 'IMPROVEMENT',
    STORY: 'STORY',
  },
  status: {
    TO_DO: 'TO DO',
    IN_PROGRESS: 'IN PROGRESS',
    DONE: 'DONE'
  },
  priority: {
    TRIVIAL: 'TRIVIAL',
    MINOR: 'MINOR',
    CRITICAL: 'CRITICAL',
    BLOCKER: 'BLOCKER'
  }
};

const { type, status, priority } = taskData;

export const types = [
  type.TASK,
  type.BUG,
  type.ISSUE,
  type.EPIC,
  type.FEATURE,
  type.IMPROVEMENT,
  type.STORY
];

export const statuses = [
  status.TO_DO,
  status.IN_PROGRESS,
  status.DONE
];

export const priorities = [
  priority.TRIVIAL,
  priority.MINOR,
  priority.CRITICAL,
  priority.BLOCKER
];
