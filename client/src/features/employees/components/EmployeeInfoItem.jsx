const EmployeeInfoItem = ({ label, value }) => {
  return (
    <div className="drawer-info">
      <span>{label}</span>
      <strong>{value || "—"}</strong>
    </div>
  );
};

export default EmployeeInfoItem;
