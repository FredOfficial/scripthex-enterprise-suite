import { useMemo, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "./AttendanceCharts.css";

const COLORS = ["#22c55e", "#f59e0b", "#3b82f6", "#ef4444"];

const formatDateKey = (date) => {
  return new Date(date).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
  });
};

const AttendanceCharts = ({ attendances }) => {
  const [trendType, setTrendType] = useState("PRESENT");

  const statusData = [
    {
      name: "Present",
      value: attendances.filter((a) => a.status === "PRESENT").length,
    },
    {
      name: "Late",
      value: attendances.filter((a) => a.status === "LATE").length,
    },
    {
      name: "Half Day",
      value: attendances.filter((a) => a.status === "HALF_DAY").length,
    },
    {
      name: "Absent",
      value: attendances.filter((a) => a.status === "ABSENT").length,
    },
  ].filter((item) => item.value > 0);

  const trendData = useMemo(() => {
    return Object.values(
      attendances.reduce((acc, attendance) => {
        const day = formatDateKey(attendance.date);

        if (!acc[day]) {
          acc[day] = {
            day,
            value: 0,
          };
        }

        switch (trendType) {
          case "PRESENT":
            if (attendance.status === "PRESENT") acc[day].value++;
            break;

          case "LATE":
            if (attendance.status === "LATE") acc[day].value++;
            break;

          case "ABSENT":
            if (attendance.status === "ABSENT") acc[day].value++;
            break;

          case "HALF_DAY":
            if (attendance.status === "HALF_DAY") acc[day].value++;
            break;

          case "COMPLETED":
            if (attendance.timeOut) acc[day].value++;
            break;

          case "PENDING":
            if (!attendance.timeOut) acc[day].value++;
            break;

          default:
            break;
        }

        return acc;
      }, {}),
    );
  }, [attendances, trendType]);

  const hoursData = Object.values(
    attendances.reduce((acc, attendance) => {
      const day = formatDateKey(attendance.date);

      if (!acc[day]) {
        acc[day] = {
          day,
          hours: 0,
        };
      }

      acc[day].hours += attendance.workingHours
        ? Number((attendance.workingHours / 60).toFixed(2))
        : 0;

      return acc;
    }, {}),
  );

  return (
    <div className="attendance-charts">
      <div className="attendance-chart-card">
        <div className="chart-header">
          <h3>Attendance Trend</h3>

          <select
            value={trendType}
            onChange={(e) => setTrendType(e.target.value)}
          >
            <option value="PRESENT">Present</option>
            <option value="LATE">Late</option>
            <option value="ABSENT">Absent</option>
            <option value="HALF_DAY">Half Day</option>
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending Time Out</option>
          </select>
        </div>

        <div className="attendance-chart-container">
          {trendData.length === 0 ? (
            <div className="attendance-chart-empty">No data available yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="attendance-chart-card">
        <h3>Attendance Status</h3>

        <div className="attendance-chart-container">
          {statusData.length === 0 ? (
            <div className="attendance-chart-empty">No data available yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {statusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="attendance-chart-card full-width">
        <h3>Working Hours by Day</h3>

        <div className="attendance-chart-container">
          {hoursData.length === 0 ? (
            <div className="attendance-chart-empty">No data available yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={hoursData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#16a34a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCharts;
