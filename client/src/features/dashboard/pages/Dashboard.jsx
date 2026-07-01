import { useEffect, useState } from "react";

import AppLayout from "../../../components/layout/AppLayout";

import DashboardCharts from "../components/DashboardCharts";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import RecentActivities from "../components/RecentActivities";

import { getDashboardStats } from "../services/dashboardService";

import "./Dashboard.css";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setDashboardData);
  }, []);

  if (!dashboardData) return <p>Loading...</p>;

  return (
    <AppLayout>
      <div className="dashboard-content">
        <DashboardHeader />

        <DashboardStats stats={dashboardData.stats} />

        <div className="dashboard-grid">
          <DashboardCharts />

          <RecentActivities activities={dashboardData.activities} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
