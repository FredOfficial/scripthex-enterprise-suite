import EmployeeInfoItem from "./EmployeeInfoItem";

const formatCurrency = (value) => {
  if (!value) return "—";

  return `₱${Number(value).toLocaleString()}`;
};

const formatDate = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatText = (value) => {
  if (!value) return "—";

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const EmployeeDrawer = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="employee-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>Employee Profile</h2>

          <button onClick={onClose}>×</button>
        </div>

        <div className="drawer-profile">
          <div className="drawer-avatar">
            {employee.firstName?.charAt(0)}
            {employee.lastName?.charAt(0)}
          </div>

          <h3>
            {employee.firstName} {employee.middleName} {employee.lastName}
          </h3>

          <p>{employee.position?.name || "Employee"}</p>

          <span
            className={`status-badge status-${employee.status.toLowerCase()}`}
          >
            {formatText(employee.status)}
          </span>
        </div>

        <div className="drawer-section">
          <h4>Employee Information</h4>

          <EmployeeInfoItem label="Employee No" value={employee.employeeNo} />
          <EmployeeInfoItem
            label="Department"
            value={employee.department?.name}
          />
          <EmployeeInfoItem label="Position" value={employee.position?.name} />
          <EmployeeInfoItem
            label="Employment Type"
            value={formatText(employee.employmentType)}
          />
          <EmployeeInfoItem
            label="Date Hired"
            value={formatDate(employee.hiredAt)}
          />
        </div>

        <div className="drawer-section">
          <h4>Contact Information</h4>

          <EmployeeInfoItem label="Email" value={employee.email} />
          <EmployeeInfoItem label="Phone" value={employee.phone} />
          <EmployeeInfoItem label="Address" value={employee.address} />
        </div>

        <div className="drawer-section">
          <h4>Compensation</h4>

          <EmployeeInfoItem
            label="Salary"
            value={formatCurrency(employee.salary)}
          />
        </div>

        <button className="drawer-edit-btn">Edit Employee</button>
      </div>
    </div>
  );
};

export default EmployeeDrawer;
