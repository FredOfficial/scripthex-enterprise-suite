import "./AuthLayout.css";

import illustration from "../../../../assets/illustrations/auth-illustration.svg";
import logo from "../../../../assets/logo/scripthex-logo.svg";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-left">
          <img src={logo} alt="ScriptHex Logo" className="auth-logo" />

          <div className="hero-text">
            <h2>Manage your business with confidence.</h2>

            <p>
              Employee Management, Attendance, Inventory and Reports — all in
              one platform.
            </p>
          </div>

          <img
            src={illustration}
            alt="Business dashboard illustration"
            className="auth-illustration"
          />
        </div>

        <div className="auth-right">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
