import {
  FiBriefcase,
  FiCalendar,
  FiClock,
  FiFileText,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import { Drawer } from "../../../components/ui";

import "./AttendanceDetailsDrawer.css";

const AttendanceDetailsDrawer = ({ open, onClose, attendance }) => {
  if (!attendance) return null;

  const employee = attendance.employee;

  const formatTime = (value) => {
    if (!value) return "—";

    return new Date(value).toLocaleTimeString("en-PH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatHours = (minutes) => {
    if (!minutes) return "—";

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    if (h === 0) return `${m} mins`;

    return `${h}h ${m}m`;
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Drawer open={open} onClose={onClose} title="Attendance Details">
      <div className="attendance-details">
        <div className="attendance-profile">
          <div className="attendance-avatar">
            {employee.firstName.charAt(0)}
          </div>

          <div>
            <h2>
              {employee.firstName} {employee.lastName}
            </h2>

            <small>{employee.employeeNo}</small>

            <p>
              {employee.department?.name || "No Department"} •{" "}
              {employee.position?.name || "No Position"}
            </p>
          </div>
        </div>

        <div className="attendance-grid">
          <div>
            <label>
              <FiBriefcase /> Department
            </label>
            <span>{employee.department?.name || "—"}</span>
          </div>

          <div>
            <label>
              <FiUser /> Position
            </label>
            <span>{employee.position?.name || "—"}</span>
          </div>

          <div className="full-width">
            <label>
              <FiCalendar /> Date
            </label>
            <span>
              {new Date(attendance.date).toLocaleDateString("en-PH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div>
            <label>
              <FiClock /> Time In
            </label>
            <span>{formatTime(attendance.timeIn)}</span>
          </div>

          <div>
            <label>
              <FiClock /> Time Out
            </label>
            <span>{formatTime(attendance.timeOut)}</span>
          </div>

          <div>
            <label>
              <FiMapPin /> Late
            </label>
            <span>
              {attendance.lateMinutes
                ? `${attendance.lateMinutes} mins late`
                : "On Time"}
            </span>
          </div>

          <div>
            <label>
              <FiClock /> Working Hours
            </label>
            <span>{formatHours(attendance.workingHours)}</span>
          </div>

          <div>
            <label>
              <FiFileText /> Status
            </label>
            <span
              className={`attendance-badge status-${attendance.status.toLowerCase()}`}
            >
              {formatStatus(attendance.status)}
            </span>
          </div>

          <div className="full-width">
            <label>
              <FiFileText /> Remarks
            </label>
            <span>{attendance.remarks || "—"}</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AttendanceDetailsDrawer;
