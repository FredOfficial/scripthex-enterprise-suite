import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import GoogleButton from "../GoogleButton";

import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <h2>Welcome back 👋</h2>

      <p>Welcome back! Sign in to continue managing your business.</p>

      <form onSubmit={handleSubmit}>
        {error && <div className="login-error">{error}</div>}

        <div className="form-group">
          <label>Email Address</label>

          <div className="input-wrapper">
            <MdOutlineMailOutline className="input-icon" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>

          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="login-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>

          <a href="#">Forgot Password?</a>
        </div>

        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="divider">
        <span>OR</span>
      </div>

      <GoogleButton />
    </div>
  );
};

export default LoginForm;
