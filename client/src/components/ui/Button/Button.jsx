import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`sh-btn sh-btn-${variant} sh-btn-${size} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
