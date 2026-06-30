import StatCard from "../../../../components/ui/StatCard";
import "./DashboardStats.css";

const DashboardStats = ({ stats }) => {
  return (
    <div className="row g-4">
      <div className="col-lg-3">
        <StatCard
          title="Employees"
          value={stats.employees}
          icon="bi-people-fill"
        />
      </div>

      <div className="col-lg-3">
        <StatCard
          title="Attendance"
          value={stats.attendance}
          icon="bi-clock-history"
        />
      </div>

      <div className="col-lg-3">
        <StatCard
          title="Inventory"
          value={stats.inventory}
          icon="bi-box-seam"
        />
      </div>

      <div className="col-lg-3">
        <StatCard
          title="Revenue"
          value={`₱${stats.revenue.toLocaleString()}`}
          icon="bi-cash-stack"
        />
      </div>
    </div>
  );
};

export default DashboardStats;
