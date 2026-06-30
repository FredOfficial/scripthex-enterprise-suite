import { useEffect, useState } from "react";

import AppLayout from "../../../components/layout/AppLayout";

import DashboardCharts from "../components/DashboardCharts";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import RecentActivities from "../components/RecentActivities";

import { getDashboardStats } from "../services/dashboardService";

import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <AppLayout>
      <div className="dashboard-content">
        <DashboardHeader />

        <DashboardStats stats={stats} />

        <div className="dashboard-grid">
          <DashboardCharts />

          <RecentActivities />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
