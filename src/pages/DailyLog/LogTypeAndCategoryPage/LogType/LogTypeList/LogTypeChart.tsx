import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { LogType } from '../../../../../api/models';
import { Card } from 'antd';

interface Props {
  logTypes: LogType[];
}

const LogTypeChart: React.FC<Props> = ({ logTypes }) => {
  const data = logTypes
    .map((lt) => ({ ...lt, totalDuration: Number(lt.totalDuration) || 0 }))
    .filter((lt) => lt.totalDuration > 0);

  return (
    <Card variant="borderless">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="totalDuration"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LogTypeChart;
