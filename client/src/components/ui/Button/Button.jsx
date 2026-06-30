const Button = ({
  children,
  variant = "primary",
  type = "button",
  onClick,
}) => {
  return (
    <button type={type} className={`btn-sh btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
