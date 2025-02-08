import React, { useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DraggableTableProps<T> {
  dataSource: T[];
  columns: TableColumnsType<T>;
}

const Row = <T extends { key: string }>({
  'data-row-key': rowKey,
  style,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & { 'data-row-key': string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: rowKey,
  });

  const rowStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={rowStyle}
      {...attributes}
      {...listeners}
    />
  );
};

const DraggableTable = <T extends { key: string }>({
  dataSource,
  columns,
}: DraggableTableProps<T>) => {
  const [data, setData] = useState(dataSource);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setData((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={data.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table<T>
          components={{
            body: { row: Row },
          }}
          rowKey="key"
          columns={columns}
          dataSource={data}
        />
      </SortableContext>
    </DndContext>
  );
};

export default DraggableTable;
