import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import PropTypes from 'prop-types';

export default function PieData({ data }) {
  const labelFormat = (value) => `R$ ${value.value.toFixed(2)}`;
  const tooltipFormatter = (value) => `R$${parseFloat(value).toFixed(2)}`;

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FFAAAA'];

  const pieData = data.reduce((acc, cur) => {
    const existingItemIndex = acc.findIndex((item) => item.name === cur.type);
    if (existingItemIndex >= 0) {
      acc[existingItemIndex].value += cur.value;
    } else {
      acc.push({ name: cur.type, value: cur.value });
    }
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={pieData} label={labelFormat} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={tooltipFormatter} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

PieData.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
