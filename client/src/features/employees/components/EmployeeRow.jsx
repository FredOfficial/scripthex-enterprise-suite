const EmployeeRow = ({ employee }) => {
  return (
    <tr>
      <td>{employee.employeeNo}</td>

      <td>
        {employee.firstName} {employee.middleName} {employee.lastName}
      </td>

      <td>{employee.department?.name}</td>

      <td>{employee.position?.name}</td>

      <td>
        <span
          className={`status-badge status-${employee.status.toLowerCase()}`}
        >
          {employee.status}
        </span>
      </td>

      <td>
        {employee.salary ? `₱${Number(employee.salary).toLocaleString()}` : "—"}
      </td>

      <td>
        <button className="table-action">View</button>

        <button className="table-action">Edit</button>
      </td>
    </tr>
  );
};

export default EmployeeRow;
