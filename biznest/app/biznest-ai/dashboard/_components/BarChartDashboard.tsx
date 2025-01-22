import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-2xl p-5">
      <h2 className="font-bold text-lg">Активность</h2>
      <ResponsiveContainer width={"100%"} height={400}>
        <BarChart
          data={budgetList}
          margin={{
            top: 7,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
              return value;
            }}
          />
          <Tooltip />
          <Legend />
          {/* Убрали stackId, чтобы столбцы не складывались */}
          <Bar dataKey="totalSpend" fill="#4845d2" />
          <Bar dataKey="amount" fill="#C3C2FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
