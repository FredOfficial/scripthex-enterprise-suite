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

import EnterpriseCalendar from "../../../components/calendar/EnterpriseCalendar";
import { exportAttendanceExcel } from "../../../utils/export/exportAttendanceExcel";
import { exportAttendancePDF } from "../../../utils/export/exportAttendancePDF";
import printAttendance from "../../../utils/print/printAttendance";
import AttendanceCharts from "../components/AttendanceCharts";
import AttendanceDetailsDrawer from "../components/AttendanceDetailsDrawer";

import "../styles/attendance.css";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [dateFilter, setDateFilter] = useState("today");
  const [openActions, setOpenActions] = useState(false);

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
    (employee) => String(employee.id) === String(selectedEmployeeId)
  );

  const activeAttendance = attendances.find(
    (attendance) =>
      String(attendance.employeeId) === String(selectedEmployeeId) &&
      attendance.timeIn &&
      !attendance.timeOut
  );

  const filterByDateRange = (attendance) => {
    const attendanceDate = new Date(attendance.date);
    const now = new Date();

    if (dateFilter === "all") return true;

    if (dateFilter === "today") {
      return attendanceDate.toDateString() === now.toDateString();
    }

    if (dateFilter === "week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      return attendanceDate >= startOfWeek && attendanceDate <= endOfWeek;
    }

    if (dateFilter === "month") {
      return (
        attendanceDate.getMonth() === now.getMonth() &&
        attendanceDate.getFullYear() === now.getFullYear()
      );
    }

    return true;
  };

  const todayAttendances = attendances.filter((attendance) => {
    const today = new Date().toDateString();
    return new Date(attendance.date).toDateString() === today;
  });

  const filteredAttendances = attendances.filter((attendance) => {
    const keyword = search.toLowerCase();
    const fullName = `${attendance.employee?.firstName || ""} ${
      attendance.employee?.middleName || ""
    } ${attendance.employee?.lastName || ""}`.toLowerCase();

    const matchesSearch =
      fullName.includes(keyword) ||
      attendance.employee?.employeeNo?.toLowerCase().includes(keyword);

    const matchesDate = filterByDateRange(attendance);

    return matchesSearch && matchesDate;
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

  const formatWorkingHours = (minutes) => {
    if (!minutes) return "—";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins} mins`;
    }

    return `${hours}h ${mins}m`;
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const calendarEvents = filteredAttendances.map((attendance) => ({
    id: attendance.id,
    title: `${attendance.employee?.firstName || "Employee"} - ${formatStatus(
      attendance.status
    )}`,
    start: new Date(attendance.date),
    end: new Date(attendance.date),
    type: attendance.status.toLowerCase(),
    resource: attendance,
  }));

  const calendarLegends = [
    { type: "present", label: "Present" },
    { type: "late", label: "Late" },
    { type: "absent", label: "Absent" },
    { type: "half_day", label: "Half Day" },
  ];

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
            title={`${
              dateFilter === "today"
                ? "Today"
                : dateFilter === "week"
                  ? "This Week"
                  : dateFilter === "month"
                    ? "This Month"
                    : "All"
            } Records`}
            value={filteredAttendances.length}
            icon={<FiUsers />}
          />

          <StatCard
            title="Present"
            value={
              filteredAttendances.filter((a) => a.status === "PRESENT").length
            }
            icon={<FiLogIn />}
            color="green"
          />

          <StatCard
            title="Late"
            value={todayAttendances.filter((a) => a.status === "LATE").length}
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
        <AttendanceCharts
          attendances={filteredAttendances}
          dateFilter={dateFilter}
        />

        <EnterpriseCalendar
          events={calendarEvents}
          legends={calendarLegends}
          onSelectEvent={(event) => setSelectedAttendance(event.resource)}
        />

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
          <div className="attendance-date-filters">
            <button
              className={dateFilter === "today" ? "active" : ""}
              onClick={() => setDateFilter("today")}
            >
              Today
            </button>

            <button
              className={dateFilter === "week" ? "active" : ""}
              onClick={() => setDateFilter("week")}
            >
              This Week
            </button>

            <button
              className={dateFilter === "month" ? "active" : ""}
              onClick={() => setDateFilter("month")}
            >
              This Month
            </button>

            <button
              className={dateFilter === "all" ? "active" : ""}
              onClick={() => setDateFilter("all")}
            >
              All
            </button>
          </div>
          <div className="attendance-actions">
            <Button onClick={() => setOpenActions(!openActions)}>
              Actions ▾
            </Button>

            {openActions && (
              <div className="attendance-actions-menu">
                <button
                  onClick={() => {
                    exportAttendanceExcel(filteredAttendances, dateFilter);
                    setOpenActions(false);
                  }}
                >
                  Export Excel
                </button>

                <button
                  onClick={() => {
                    exportAttendancePDF(filteredAttendances, dateFilter);
                    setOpenActions(false);
                  }}
                >
                  Export PDF
                </button>
                <button
                  onClick={() => {
                    printAttendance(filteredAttendances, dateFilter);
                    setOpenActions(false);
                  }}
                >
                  Print Attendance
                </button>
              </div>
            )}
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
                  <th>Late</th>
                  <th>Hours</th>
                  <th>Status</th>
                  <th>Remarks</th>
                  <th>Action</th>
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
                      {attendance.lateMinutes
                        ? `${attendance.lateMinutes} min`
                        : "—"}
                    </td>

                    <td>{formatWorkingHours(attendance.workingHours)}</td>

                    <td>
                      <span
                        className={`attendance-badge status-${attendance.status.toLowerCase()}`}
                      >
                        {formatStatus(attendance.status)}
                      </span>
                    </td>

                    <td>{attendance.remarks || "—"}</td>
                    <td>
                      <button
                        className="table-action"
                        onClick={() => setSelectedAttendance(attendance)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {selectedAttendance && (
          <AttendanceDetailsDrawer
            open={!!selectedAttendance}
            attendance={selectedAttendance}
            onClose={() => setSelectedAttendance(null)}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Attendance;
