export const getDashboardData = () => {
  return Promise.resolve({
    stats: {
      employees: 128,

      attendance: "98%",

      inventory: 542,

      revenue: 152300,
    },

    activities: [
      "Juan Dela Cruz added",

      "Attendance Approved",

      "Inventory Updated",

      "Payroll Generated",
    ],
  });
};
