export interface InputProps {
  name: string;
  defaultValue?: string | null;
  label: string;
  margin?: 'none' | 'dense' | 'normal';
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  deadline?: string | null;
  status: 'Pending' | 'Completed' | 'Overdue' | 'Removed';
}