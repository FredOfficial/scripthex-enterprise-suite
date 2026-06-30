import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Attendance from "../../features/attendance/pages/Attendance";
import Dashboard from "../../features/dashboard/pages/Dashboard";
import Employees from "../../features/employees/pages/Employees";
import Inventory from "../../features/inventory/pages/Inventory";
import Reports from "../../features/reports/pages/Reports";
import Settings from "../../features/settings/pages/Settings";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
