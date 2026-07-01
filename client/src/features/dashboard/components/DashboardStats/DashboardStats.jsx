import { FiBox, FiClock, FiDollarSign, FiUsers } from "react-icons/fi";

import { StatCard } from "../../../../components/ui";

import "./DashboardStats.css";

const DashboardStats = ({ stats }) => {
  return (
    <div className="row g-4">
      <div className="col-lg-3">
        <StatCard
          title="Employees"
          value={stats.employees}
          icon={<FiUsers />}
          color="blue"
        />
      </div>

      <div className="col-lg-3">
        <StatCard
          title="Attendance"
          value={stats.attendance}
          icon={<FiClock />}
          color="green"
        />
      </div>

      <div className="col-lg-3">
        <StatCard
          title="Inventory"
          value={stats.inventory}
          icon={<FiBox />}
          color="orange"
        />
      </div>

      <div className="col-lg-3">
        <StatCard
          title="Revenue"
          value={`₱${stats.revenue.toLocaleString()}`}
          icon={<FiDollarSign />}
          color="red"
        />
      </div>
    </div>
  );
};

export default DashboardStats;
