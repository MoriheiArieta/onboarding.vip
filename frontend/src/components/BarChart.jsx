import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  return (
    <div className="mb-20 w-[90%] max-w-[1000px]">
      <h2 className="text-center">Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
