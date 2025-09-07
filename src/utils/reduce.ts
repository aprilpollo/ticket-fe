import type { ColumnProps, RowsProps, TaskProps } from "@/types/task";

export function transformDataForKanban(
  columns: ColumnProps[],
  tasks: RowsProps[]
): Record<string, TaskProps[]> {
  const columnMap = columns.reduce((acc, column) => {
    acc[column.id] = column.status;
    return acc;
  }, {} as Record<number, string>);

  const result = columns.reduce((acc, column) => {
    acc[column.status] = [];
    return acc;
  }, {} as Record<string, TaskProps[]>);

  tasks.forEach((task) => {
    const columnTitle = columnMap[task.columnId];
    if (columnTitle && result[columnTitle]) {
      result[columnTitle].push({
        id: task.id,
        title: task.title,
        description: task.description,
        assignees: task.assignees,
        priority: task.priority,
      });
    }
  });

  return result;
}
