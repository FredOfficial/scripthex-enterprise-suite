import "./DashboardCharts.css";

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

const COLORS = ["#2563EB", "#16A34A", "#F59E0B", "#DC2626", "#7C3AED"];

const hasData = (data) => {
  return (
    Array.isArray(data) &&
    data.some((item) => item.value > 0 || item.employees > 0)
  );
};

const ChartEmpty = () => {
  return <div className="chart-empty">No data available yet</div>;
};

const DashboardCharts = ({ charts }) => {
  const monthlyData = Object.values(
    charts.monthlyHires.reduce((acc, item) => {
      const date = new Date(item.hiredAt);
      const month = date.toLocaleString("default", { month: "short" });

      if (!acc[month]) {
        acc[month] = {
          month,
          employees: 0,
        };
      }

      acc[month].employees += 1;
      return acc;
    }, {}),
  );

  return (
    <div className="dashboard-charts">
      <div className="chart-card">
        <h5>Monthly Employee Hires</h5>

        <div className="chart-container">
          {hasData(monthlyData) ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="employees"
                  stroke="#2563EB"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ChartEmpty />
          )}
        </div>
      </div>

      <div className="chart-card">
        <h5>Employees by Department</h5>

        <div className="chart-container">
          {hasData(charts.employeesByDepartment) ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={charts.employeesByDepartment}
                  dataKey="value"
                  nameKey="label"
                  outerRadius={95}
                  label
                >
                  {charts.employeesByDepartment.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ChartEmpty />
          )}
        </div>
      </div>

      <div className="chart-card">
        <h5>Employee Status</h5>

        <div className="chart-container">
          {hasData(charts.employeesByStatus) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={charts.employeesByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#16A34A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ChartEmpty />
          )}
        </div>
      </div>

      <div className="chart-card">
        <h5>Gender Distribution</h5>

        <div className="chart-container">
          {hasData(charts.genderDistribution) ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={charts.genderDistribution}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={55}
                  outerRadius={95}
                  label
                >
                  {charts.genderDistribution.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ChartEmpty />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
