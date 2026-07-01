import { useEffect, useState } from "react";
import { FiClock, FiLogIn, FiLogOut, FiSearch, FiUsers } from "react-icons/fi";

import AppLayout from "../../../components/layout/AppLayout";
import { Button, StatCard } from "../../../components/ui";
import { showError, showSuccess } from "../../../utils/toast";
import { getEmployees } from "../../employees/services/employeeService";

import {
  getAttendances,
  timeInEmployee,
  timeOutAttendance,
} from "../services/attendanceService";

import "../styles/attendance.css";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [employeeResult, attendanceResult] = await Promise.all([
        getEmployees(),
        getAttendances(),
      ]);

      setEmployees(employeeResult.data || []);
      setAttendances(attendanceResult.data || []);
    } catch (error) {
      showError("Failed to load attendance data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedEmployee = employees.find(
    (employee) => String(employee.id) === String(selectedEmployeeId),
  );

  const activeAttendance = attendances.find(
    (attendance) =>
      String(attendance.employeeId) === String(selectedEmployeeId) &&
      attendance.timeIn &&
      !attendance.timeOut,
  );

  const todayAttendances = attendances.filter((attendance) => {
    const today = new Date().toDateString();
    return new Date(attendance.date).toDateString() === today;
  });

  const filteredAttendances = attendances.filter((attendance) => {
    const keyword = search.toLowerCase();
    const fullName = `${attendance.employee?.firstName || ""} ${
      attendance.employee?.middleName || ""
    } ${attendance.employee?.lastName || ""}`.toLowerCase();

    return (
      fullName.includes(keyword) ||
      attendance.employee?.employeeNo?.toLowerCase().includes(keyword)
    );
  });

  const handleTimeIn = async () => {
    if (!selectedEmployeeId) {
      showError("Please select an employee first.");
      return;
    }

    try {
      await timeInEmployee({
        employeeId: selectedEmployeeId,
        status: "PRESENT",
        remarks: "Manual time in",
      });

      showSuccess(`${selectedEmployee.firstName} timed in successfully.`);
      await fetchData();
    } catch (error) {
      showError(error.response?.data?.message || "Failed to time in.");
    }
  };

  const handleTimeOut = async () => {
    if (!activeAttendance) {
      showError("No active time in record found for this employee.");
      return;
    }

    try {
      await timeOutAttendance(activeAttendance.id);

      showSuccess(`${selectedEmployee.firstName} timed out successfully.`);
      await fetchData();
    } catch (error) {
      showError(error.response?.data?.message || "Failed to time out.");
    }
  };

  const formatTime = (value) => {
    if (!value) return "—";

    return new Date(value).toLocaleTimeString("en-PH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AppLayout>
      <div className="attendance-page">
        <div className="attendance-header">
          <div>
            <h2>Attendance</h2>
            <p>Track daily employee time in and time out records.</p>
          </div>
        </div>

        <div className="attendance-stats-grid">
          <StatCard
            title="Today Records"
            value={todayAttendances.length}
            icon={<FiUsers />}
          />

          <StatCard
            title="Present"
            value={
              todayAttendances.filter((a) => a.status === "PRESENT").length
            }
            icon={<FiLogIn />}
            color="green"
          />

          <StatCard
            title="Pending Time Out"
            value={todayAttendances.filter((a) => !a.timeOut).length}
            icon={<FiClock />}
            color="orange"
          />

          <StatCard
            title="Completed"
            value={todayAttendances.filter((a) => a.timeOut).length}
            icon={<FiLogOut />}
            color="red"
          />
        </div>

        <div className="attendance-action-card">
          <h3>Manual Attendance</h3>

          <div className="attendance-form-row">
            <select
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              disabled={loading}
            >
              <option value="">Select Employee</option>

              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.employeeNo} - {employee.firstName}{" "}
                  {employee.lastName}
                </option>
              ))}
            </select>

            <Button onClick={handleTimeIn}>Time In</Button>

            <Button onClick={handleTimeOut}>Time Out</Button>
          </div>

          {selectedEmployee && (
            <div className="selected-employee-card">
              <strong>
                {selectedEmployee.firstName} {selectedEmployee.middleName}{" "}
                {selectedEmployee.lastName}
              </strong>

              <span>
                {selectedEmployee.department?.name || "No Department"}
              </span>

              <span>{selectedEmployee.position?.name || "No Position"}</span>
            </div>
          )}
        </div>

        <div className="attendance-toolbar">
          <div className="search-box">
            <FiSearch />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search attendance..."
              disabled={loading}
            />
          </div>
        </div>

        <div className="attendance-table-card">
          {loading ? (
            <p>Loading attendance...</p>
          ) : filteredAttendances.length === 0 ? (
            <p>No attendance records found.</p>
          ) : (
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>

              <tbody>
                {filteredAttendances.map((attendance) => (
                  <tr key={attendance.id}>
                    <td>
                      {attendance.employee?.employeeNo} -{" "}
                      {attendance.employee?.firstName}{" "}
                      {attendance.employee?.lastName}
                    </td>
                    <td>{attendance.employee?.department?.name || "—"}</td>
                    <td>{new Date(attendance.date).toLocaleDateString()}</td>
                    <td>{formatTime(attendance.timeIn)}</td>
                    <td>{formatTime(attendance.timeOut)}</td>
                    <td>
                      <span
                        className={`attendance-badge status-${attendance.status.toLowerCase()}`}
                      >
                        {attendance.status}
                      </span>
                    </td>
                    <td>{attendance.remarks || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Attendance;
