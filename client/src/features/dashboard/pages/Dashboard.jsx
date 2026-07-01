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
  const [dashboard, setDashboard] = useState({
    stats: {
      employees: 0,
      activeEmployees: 0,
      attendance: 0,
      inventory: 0,
      revenue: 0,
    },
    charts: {
      employeesByDepartment: [],
      employeesByStatus: [],
      genderDistribution: [],
      monthlyHires: [],
    },
  });

  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const result = await getDashboardStats();
      setDashboard(result.data);
      setActivities(result.data.recentActivities || []);
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

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <DashboardStats stats={dashboard.stats} />
        )}

        <div className="dashboard-main">
          <DashboardCharts charts={dashboard.charts} />

          <RecentActivities activities={activities} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
