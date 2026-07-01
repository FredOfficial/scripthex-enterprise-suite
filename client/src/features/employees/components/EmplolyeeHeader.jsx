const EmployeeHeader = ({ onAdd }) => {
  return (
    <div className="employees-header">
      <div>
        <h2>Employees</h2>
        <p>Manage employee records, departments, and positions.</p>
      </div>

      <button className="add-employee-btn" onClick={onAdd}>
        + Add Employee
      </button>
    </div>
  );
};

export default EmployeeHeader;
