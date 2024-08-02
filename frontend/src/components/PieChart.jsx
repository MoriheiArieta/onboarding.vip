import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData }) => {
  return (
    <div className="mb-20 w-[90%] max-w-[600px]">
      <h2 className="text-center">Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users gained between 2016-2020",
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
