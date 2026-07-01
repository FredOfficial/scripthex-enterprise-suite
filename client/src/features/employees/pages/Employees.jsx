import { useEffect, useState } from "react";
import {
  FiClock,
  FiSearch,
  FiUserCheck,
  FiUserMinus,
  FiUsers,
} from "react-icons/fi";

import AppLayout from "../../../components/layout/AppLayout";
import { Button, StatCard } from "../../../components/ui";

import EmployeeDrawer from "../components/EmployeeDrawer";
import EmployeeModal from "../components/EmployeeModal";
import {
  getDepartments,
  getEmployees,
  getPositions,
} from "../services/employeeService";

import DeleteEmployeeModal from "../components/DeleteEmployeeModal";
import EmployeeSkeleton from "../components/EmployeeSkeleton";
import "../styles/employees.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteEmployeeData, setDeleteEmployeeData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchEmployees = async () => {
    try {
      const result = await getEmployees();
      setEmployees(result.data || []);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadDropdowns = async () => {
    try {
      const dept = await getDepartments();
      const pos = await getPositions();

      setDepartments(dept.data || []);
      setPositions(pos.data || []);
    } catch (error) {
      console.error("Failed to load dropdowns:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    loadDropdowns();
    setCurrentPage(1);
  }, [search, departmentFilter, positionFilter, statusFilter]);

  const filteredEmployees = employees.filter((employee) => {
    const keyword = search.toLowerCase();

    const fullName =
      `${employee.firstName} ${employee.middleName || ""} ${employee.lastName}`.toLowerCase();

    const matchesSearch =
      employee.employeeNo.toLowerCase().includes(keyword) ||
      fullName.includes(keyword) ||
      employee.email?.toLowerCase().includes(keyword);

    const matchesDepartment =
      !departmentFilter || String(employee.departmentId) === departmentFilter;

    const matchesPosition =
      !positionFilter || String(employee.positionId) === positionFilter;

    const matchesStatus = !statusFilter || employee.status === statusFilter;

    return (
      matchesSearch && matchesDepartment && matchesPosition && matchesStatus
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / itemsPerPage),
  );

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <AppLayout>
      <div className="employees-page">
        <div className="employees-header">
          <div>
            <h2>Employees</h2>
            <p>Manage employee records, departments, and positions.</p>
          </div>

          <Button onClick={() => setOpenModal(true)}>+ Add Employee</Button>
        </div>

        <div className="employee-stats-grid">
          {loading ? (
            <>
              <StatCard title="Employees" value="—" icon={<FiUsers />} />
              <StatCard
                title="Active"
                value="—"
                icon={<FiUserCheck />}
                color="green"
              />
              <StatCard
                title="Probation"
                value="—"
                icon={<FiClock />}
                color="orange"
              />
              <StatCard
                title="Inactive"
                value="—"
                icon={<FiUserMinus />}
                color="red"
              />
            </>
          ) : (
            <>
              <StatCard
                title="Employees"
                value={employees.length}
                icon={<FiUsers />}
              />

              <StatCard
                title="Active"
                value={employees.filter((e) => e.status === "ACTIVE").length}
                icon={<FiUserCheck />}
                color="green"
              />

              <StatCard
                title="Probation"
                value={
                  employees.filter((e) => e.status === "PROBATIONARY").length
                }
                icon={<FiClock />}
                color="orange"
              />

              <StatCard
                title="Inactive"
                value={
                  employees.filter(
                    (e) =>
                      e.status === "INACTIVE" ||
                      e.status === "RESIGNED" ||
                      e.status === "TERMINATED",
                  ).length
                }
                icon={<FiUserMinus />}
                color="red"
              />
            </>
          )}
        </div>

        {openModal && (
          <EmployeeModal
            mode="create"
            onClose={() => setOpenModal(false)}
            onSuccess={fetchEmployees}
          />
        )}

        {editingEmployee && (
          <EmployeeModal
            mode="edit"
            employee={editingEmployee}
            onClose={() => setEditingEmployee(null)}
            onSuccess={fetchEmployees}
          />
        )}

        <div className="employees-toolbar">
          <div className="search-box">
            <FiSearch />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employee..."
              disabled={loading}
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            disabled={loading}
          >
            <option value="">All Departments</option>

            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            disabled={loading}
          >
            <option value="">All Positions</option>

            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            disabled={loading}
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="PROBATIONARY">Probationary</option>
            <option value="INACTIVE">Inactive</option>
            <option value="RESIGNED">Resigned</option>
            <option value="TERMINATED">Terminated</option>
          </select>
        </div>

        <div className="employees-table-card">
          {loading ? (
            <EmployeeSkeleton />
          ) : filteredEmployees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Employee No</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.employeeNo}</td>
                    <td>
                      {employee.firstName} {employee.middleName}{" "}
                      {employee.lastName}
                    </td>
                    <td>{employee.department?.name || "—"}</td>
                    <td>{employee.position?.name || "—"}</td>
                    <td>
                      <span
                        className={`status-badge status-${employee.status.toLowerCase()}`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td>
                      {employee.salary
                        ? `₱${Number(employee.salary).toLocaleString()}`
                        : "—"}
                    </td>
                    <td>
                      <button
                        className="table-action"
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        View
                      </button>

                      <button
                        className="table-action"
                        onClick={() => setEditingEmployee(employee)}
                      >
                        Edit
                      </button>

                      <button
                        className="table-action danger"
                        onClick={() => setDeleteEmployeeData(employee)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && filteredEmployees.length > 0 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {selectedEmployee && (
          <EmployeeDrawer
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
          />
        )}

        {deleteEmployeeData && (
          <DeleteEmployeeModal
            employee={deleteEmployeeData}
            onClose={() => setDeleteEmployeeData(null)}
            onSuccess={fetchEmployees}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Employees;
