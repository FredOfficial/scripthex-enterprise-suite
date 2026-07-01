import "./DashboardCharts.css";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const DashboardCharts = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Employees",
        data: [25, 40, 55, 70, 95, 128],
        borderColor: "#2563EB",
        backgroundColor: "rgba(37,99,235,.15)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="chart-card">
      <h5>Employee Growth</h5>

      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardCharts;
