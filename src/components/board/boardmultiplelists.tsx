

import {
  memo,
  useCallback,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";
import { defaultPreset, PointerSensor, KeyboardSensor } from "@dnd-kit/dom";
import { Debug } from "@dnd-kit/dom/plugins/debug";
import { DragDropEventHandlers } from "@dnd-kit/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Container, Item } from "./components";
import { cloneDeep } from "@/utils";
import { AvatarList } from "@/components/ui/avatar";
import type {
  MultipleProps,
  TaskProps,
  SortableItemProps,
  SortableColumnProps,
} from "@/types/task";
import PrioritySelector, {
  PriorityProvider,
} from "@/components/board/priority";

const sensors = [
  PointerSensor.configure({
    activatorElements(source) {
      return [source.element, source.handle];
    },
  }),
  KeyboardSensor,
];

const SortableItem = memo(function SortableItem({
  id,
  column,
  index,
  style,
  item,
}: PropsWithChildren<SortableItemProps>) {
  const group = column;
  const { ref, isDragging } = useSortable({
    id,
    group,
    accept: "item",
    type: "item",
    feedback: "clone",
    index,
    data: { group },
  });

  return (
    <Item
      ref={ref}
      shadow={isDragging}
      style={style}
      transitionId={`sortable-${column}-${id}`}
      title={item.title}
    >
      <div className="my-2 text-sm line-clamp-2">{item.description}</div>
      <div className="flex gap-2 justify-between items-center">
        <AvatarList items={item.assignees} maxDisplay={3} />
        <PrioritySelector id={item.priority} />
      </div>
    </Item>
  );
});

const SortableColumn = memo(function SortableColumn({
  rows,
  id,
  index,
  scrollable,
  style,
}: PropsWithChildren<SortableColumnProps>) {
  const { isDragging, ref } = useSortable({
    id,
    accept: ["column", "item"],
    collisionPriority: CollisionPriority.Low,
    type: "column",
    index,
  });

  return (
    <Container
      ref={ref}
      label={`${id}`}
      shadow={isDragging}
      scrollable={scrollable}
      transitionId={`sortable-column-${id}`}
      style={style}
    >
      {rows.map((item, index) => (
        <SortableItem
          key={item.id}
          id={item.id}
          column={id}
          index={index}
          item={item}
        />
      ))}
    </Container>
  );
});

export function MultipleLists({
  debug,
  taskItems,
  grid,
  columnStyle,
  scrollable,
}: MultipleProps) {
  const [items, setItems] = useState<Record<string, TaskProps[]>>(taskItems);
  const [columns] = useState(Object.keys(items));
  const snapshot = useRef(cloneDeep(items));

  return (
    <PriorityProvider>
      <DragDropProvider
        plugins={debug ? [...defaultPreset.plugins, Debug] : undefined}
        sensors={sensors}
        onDragStart={useCallback<DragDropEventHandlers["onDragStart"]>(() => {
          snapshot.current = cloneDeep(items);
        }, [items])}
        onDragOver={useCallback<DragDropEventHandlers["onDragOver"]>(
          (event) => {
            const { source } = event.operation;

            if (source?.type === "column") {
              return;
            }

            setItems((items) => move(items, event));
          },
          []
        )}
        onDragEnd={useCallback<DragDropEventHandlers["onDragEnd"]>((event) => {
          if (event.canceled) {
            setItems(snapshot.current);
            return;
          }
        }, [])}
      >
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="flex gap-4">
            {columns.map((column, columnIndex) => {
              const rows = items[column];

              return (
                <SortableColumn
                  key={column}
                  id={column}
                  index={columnIndex}
                  scrollable={scrollable}
                  style={columnStyle}
                  rows={rows}
                />
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DragDropProvider>
    </PriorityProvider>
  );
}
