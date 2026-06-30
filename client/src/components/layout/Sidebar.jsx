import "./Sidebar.css";

const menus = [
  { icon: "bi-grid", label: "Dashboard" },
  { icon: "bi-people", label: "Employees" },
  { icon: "bi-clock-history", label: "Attendance" },
  { icon: "bi-box-seam", label: "Inventory" },
  { icon: "bi-bar-chart", label: "Reports" },
  { icon: "bi-gear", label: "Settings" },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">⬢</div>

        <div>
          <h4>ScriptHex</h4>
          <span>Enterprise Suite</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menus.map((menu) => (
          <button key={menu.label} className="menu-item">
            <i className={`bi ${menu.icon}`}></i>

            <span>{menu.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">Version 1.0.0</div>
    </aside>
  );
};

export default Sidebar;
