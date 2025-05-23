import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { LogCategory } from '../../../../../api/models'; // Adjust path as needed
import { Card } from 'antd';

interface Props {
  logCategories: LogCategory[];
}

const LogCategoryChart: React.FC<Props> = ({ logCategories }) => {
  const data = logCategories
    .map((lc) => ({ ...lc, totalDuration: Number(lc.totalDuration) || 0 }))
    .filter((lc) => lc.totalDuration > 0);

  return (
    <Card bordered={false}>
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

export default LogCategoryChart;
