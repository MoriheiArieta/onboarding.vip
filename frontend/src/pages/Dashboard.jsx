import { Chart } from "chart.js/auto";
import { useState, useEffect } from "react";
import { CategoryScale } from "chart.js";
import PieChart from "../components/PieChart.jsx";
import BarChart from "../components/BarChart.jsx";
import LineChart from "../components/LineChart.jsx";
import FlowChart from "../components/FlowChart.jsx";
import { ReactFlowProvider } from "@xyflow/react";

// Import the JSON file
import chartDataJson from "../../utils/chartData.json";

Chart.register(CategoryScale);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const data = chartDataJson.data;
    setChartData({
      labels: data.map((item) => item.year),
      datasets: [
        {
          label: "Users Gained ",
          data: data.map((item) => item.userGain),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#f0331a",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, []);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-bold">Charts sample using Chartsjs</h1>
      <PieChart chartData={chartData} />
      <BarChart chartData={chartData} />
      <LineChart chartData={chartData} />
      <h2 className="text-center font-bold">
        Flowchart sample using React Flow
      </h2>
      <div className="w-[80%] h-[100vh] my-4 border border-gray-300 rounded-lg">
        <ReactFlowProvider>
          <FlowChart />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Dashboard;
