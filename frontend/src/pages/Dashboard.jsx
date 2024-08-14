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
    fetch("http://localhost:3000/api/chartData", {
      credentials: "include", // This is important for including cookies in the request
    })
      .then((response) => response.json())
      .then((jsonData) => {
        const data = jsonData.data;
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
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center font-bold mt-4">
        Flowchart sample using React Flow
      </h2>
      <div className="w-[80%] h-[80vh] my-4 border border-gray-300 rounded-lg">
        <ReactFlowProvider>
          <FlowChart />
        </ReactFlowProvider>
      </div>
      <h1 className="text-center font-bold mt-4">
        Charts sample using Chartsjs
      </h1>
      <div className="flex flex-row h-[600px] w-[80%]  border-red-700 rounded-lg p-4 mb-10">
        <div className="w-1/2 h-full  border-red-700 rounded-lg p-4 flex items-center justify-center">
          <div className="w-full h-full">
            <PieChart chartData={chartData} />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col pl-4">
          <div className="h-1/2  border-red-700 rounded-lg p-4 mb-4">
            <BarChart chartData={chartData} />
          </div>
          <div className="h-1/2  border-red-700 rounded-lg p-4">
            <LineChart chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
