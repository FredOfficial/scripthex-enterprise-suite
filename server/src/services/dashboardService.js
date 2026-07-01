const prisma = require("../config/prisma");

const getDashboardStats = async () => {
  const employees = await prisma.employee.count();

  return {
    employees,
    attendance: 0,
    inventory: 0,
    revenue: 0,
  };
};

module.exports = {
  getDashboardStats,
};
