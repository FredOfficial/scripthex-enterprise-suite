import { useEffect, useState } from "react";

import {
  createEmployee,
  getDepartments,
  getPositions,
  updateEmployee,
} from "../services/employeeService";

import { showError, showSuccess } from "../../../utils/toast";

const EmployeeModal = ({
  mode = "create",
  employee = null,
  onClose,
  onSuccess,
}) => {
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);

  const [form, setForm] = useState({
    employeeNo: employee?.employeeNo || "",
    firstName: employee?.firstName || "",
    middleName: employee?.middleName || "",
    lastName: employee?.lastName || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    address: employee?.address || "",
    gender: employee?.gender || "",
    departmentId: employee?.departmentId || "",
    positionId: employee?.positionId || "",
    employmentType: employee?.employmentType || "FULL_TIME",
    status: employee?.status || "ACTIVE",
    hiredAt: employee?.hiredAt ? employee.hiredAt.slice(0, 10) : "",
    salary: employee?.salary || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDropdowns = async () => {
      const dept = await getDepartments();
      const pos = await getPositions();

      setDepartments(dept.data || []);
      setPositions(pos.data || []);
    };

    loadDropdowns();
  }, []);

  const getEmployeeName = () => {
    return `${form.firstName} ${form.middleName || ""} ${form.lastName}`
      .replace(/\s+/g, " ")
      .trim();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const employeeName = getEmployeeName();

    try {
      if (mode === "edit" && employee) {
        await updateEmployee(employee.id, form);
        showSuccess(`Employee ${employeeName} was updated successfully.`);
      } else {
        await createEmployee(form);
        showSuccess(`Employee ${employeeName} was created successfully.`);
      }

      await onSuccess();
      onClose();
    } catch (err) {
      showError(err.response?.data?.message || "Failed to save employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="employee-modal">
        <h2>{mode === "edit" ? "Edit Employee" : "Add Employee"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="employeeNo"
            placeholder="Employee No"
            value={form.employeeNo}
            onChange={handleChange}
            required
          />

          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <input
            name="middleName"
            placeholder="Middle Name"
            value={form.middleName}
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            name="departmentId"
            value={form.departmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>

            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>

          <select
            name="positionId"
            value={form.positionId}
            onChange={handleChange}
            required
          >
            <option value="">Select Position</option>

            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </select>

          <select
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERN">Intern</option>
            <option value="PROBATIONARY">Probationary</option>
          </select>

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="RESIGNED">Resigned</option>
            <option value="TERMINATED">Terminated</option>
          </select>

          <input
            name="salary"
            type="number"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
          />

          <input
            type="date"
            name="hiredAt"
            value={form.hiredAt}
            onChange={handleChange}
            required
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : mode === "edit"
                  ? "Update Employee"
                  : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
