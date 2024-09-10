export interface TaskStatus {
    value: string;
    label: string;
  }
  
  export const TASK_STATUSES: TaskStatus[] = [
    { value: 'New', label: 'New' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Blocked', label: 'Blocked' },
    { value: 'Done', label: 'Done' }
  ];
  