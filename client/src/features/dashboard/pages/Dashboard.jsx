import { useEffect, useState } from "react";

import AppLayout from "../../../components/layout/AppLayout";

import DashboardCharts from "../components/DashboardCharts";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSkeleton from "../components/DashboardSkeleton";
import DashboardStats from "../components/DashboardStats";
import RecentActivities from "../components/RecentActivities";

import { getDashboardStats } from "../services/dashboardService";

import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    employees: 0,
    attendance: 0,
    inventory: 0,
    revenue: 0,
  });

  const [activities] = useState([
    "Employee records updated",
    "Dashboard data synced",
    "System authentication active",
  ]);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const result = await getDashboardStats();
      setStats(result.data);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <AppLayout>
      <div className="dashboard-content">
        <DashboardHeader />
        {loading ? <DashboardSkeleton /> : <DashboardStats stats={stats} />}
        <div className="dashboard-grid">
          <DashboardCharts />

          <RecentActivities activities={activities} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
