import { FcGoogle } from "react-icons/fc";
import "./GoogleButton.css";

const GoogleButton = () => {
  return (
    <button className="google-btn">
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );
};

export default GoogleButton;
