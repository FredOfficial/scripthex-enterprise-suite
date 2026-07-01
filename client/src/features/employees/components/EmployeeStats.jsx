const EmployeeStats = ({ total }) => {
  return (
    <div className="employee-summary-card">
      <div>
        <span>Total Employees</span>

        <h3>{total}</h3>
      </div>
    </div>
  );
};

export default EmployeeStats;
