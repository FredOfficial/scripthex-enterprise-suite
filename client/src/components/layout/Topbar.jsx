import "./Topbar.css";

const Topbar = () => {
  return (
    <header className="topbar">
      <h2>Dashboard</h2>

      <div className="topbar-right">
        <i className="bi bi-bell"></i>

        <div className="user-avatar">FM</div>
      </div>
    </header>
  );
};

export default Topbar;
