import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const menuItems = [
  { icon: "bi-grid", label: "Dashboard", path: "/dashboard" },
  { icon: "bi-people", label: "Employees", path: "/employees" },
  { icon: "bi-clock-history", label: "Attendance", path: "/attendance" },
  { icon: "bi-box-seam", label: "Inventory", path: "/inventory" },
  { icon: "bi-bar-chart", label: "Reports", path: "/reports" },
  { icon: "bi-gear", label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">⬢</div>

        <div>
          <h3>ScriptHex</h3>
          <span>Enterprise Suite</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">Version 1.0.0</div>
    </aside>
  );
};

export default Sidebar;
