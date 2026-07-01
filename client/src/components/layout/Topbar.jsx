import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Topbar.css";

const Topbar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
    role: "ADMIN",
  };

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="topbar">
      <div>
        <h2>Dashboard</h2>
        <p>Welcome back, {user.name}</p>
      </div>

      <div className="topbar-right">
        <button className="topbar-icon-btn">
          <i className="bi bi-bell"></i>
        </button>

        <div className="user-menu-wrapper">
          <button
            className="user-menu-button"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <div className="user-avatar">{initials}</div>

            <div className="user-meta">
              <strong>{user.name}</strong>
              <span>{user.role}</span>
            </div>

            <i className="bi bi-chevron-down"></i>
          </button>

          {openMenu && (
            <div className="user-dropdown">
              <button onClick={() => navigate("/settings")}>
                <i className="bi bi-gear"></i>
                Settings
              </button>

              <button className="logout-btn" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
