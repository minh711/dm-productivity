import React, { useContext, useMemo, useState } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
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
  onSortEnd?: (newData: T[]) => void;
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <span style={{ cursor: 'move' }} ref={setActivatorNodeRef} {...listeners}>
      <HolderOutlined />
    </span>
  );
};

const Row = <T extends { key: string }>({
  'data-row-key': rowKey,
  style,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & { 'data-row-key': string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rowKey });

  const rowStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={rowStyle} {...attributes} />
    </RowContext.Provider>
  );
};

const DraggableTable = <T extends { key: string }>({
  dataSource,
  columns,
  onSortEnd,
}: DraggableTableProps<T>) => {
  const data = dataSource;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 1 },
    })
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = data.findIndex((i) => i.key === active.id);
      const overIndex = data.findIndex((i) => i.key === over?.id);
      const newData = arrayMove(data, activeIndex, overIndex);
      console.log('Updated order:', newData);
      onSortEnd?.(newData); // Notify parent to update state
    }
  };

  const updatedColumns = [
    {
      key: 'sort',
      width: 20,
      render: () => <DragHandle />,
    },
    ...columns,
  ];

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
          components={{ body: { row: Row } }}
          rowKey="key"
          columns={updatedColumns}
          dataSource={data}
          pagination={false}
        />
      </SortableContext>
    </DndContext>
  );
};

export default DraggableTable;
