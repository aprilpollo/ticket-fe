import type { AvatarProps } from "@/components/ui/avatar";

interface MultipleProps {
  debug?: boolean;
  grid?: boolean;
  taskItems: Record<string, TaskProps[]>;
  columnStyle?: Record<string, string>;
  scrollable?: boolean;
  vertical?: boolean;
}

interface TaskProps {
  id: string | number;
  title: string;
  description: string;
  assignees?: AvatarProps[];
  priority?: number;
}

interface SortableColumnProps {
  id: string;
  index: number;
  scrollable?: boolean;
  style?: React.CSSProperties;
  rows: TaskProps[];
}

interface SortableItemProps {
  id: string | number;
  column: string;
  index: number;
  item: TaskProps;
  style?: React.CSSProperties;
}

interface ColumnProps {
  id: number;
  status: string;
  color?: string;
}

interface RowsProps {
  id: string | number;
  columnId: number;
  title: string;
  description: string;
  assignees?: AvatarProps[];
  priority?: number;
}

interface PriorityProps {
  id: number;
  level: number;
  name: string;
  color: string;
}

export type {
  MultipleProps,
  TaskProps,
  SortableItemProps,
  SortableColumnProps,
  ColumnProps,
  RowsProps,
  PriorityProps
};
