const prisma = require("../config/prisma");
const activityService = require("./activityService");

const getDashboardStats = async () => {
  const employees = await prisma.employee.count();

  const activeEmployees = await prisma.employee.count({
    where: { status: "ACTIVE" },
  });

  const employeesByDepartment = await prisma.department.findMany({
    select: {
      name: true,
      _count: {
        select: {
          employees: true,
        },
      },
    },
  });

  const employeesByStatus = await prisma.employee.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  const genderDistribution = await prisma.employee.groupBy({
    by: ["gender"],
    _count: {
      gender: true,
    },
    where: {
      gender: {
        not: null,
      },
    },
  });

  const monthlyHires = await prisma.employee.findMany({
    select: {
      hiredAt: true,
    },
  });
  const recentActivities = await activityService.getRecentActivities();

  return {
    stats: {
      employees,
      activeEmployees,
      attendance: 0,
      inventory: 0,
      revenue: 0,
    },

    charts: {
      employeesByDepartment: employeesByDepartment.map((item) => ({
        label: item.name,
        value: item._count.employees,
      })),

      employeesByStatus: employeesByStatus.map((item) => ({
        label: item.status,
        value: item._count.status,
      })),

      genderDistribution: genderDistribution.map((item) => ({
        label: item.gender || "Unknown",
        value: item._count.gender,
      })),

      monthlyHires: monthlyHires.map((item) => ({
        hiredAt: item.hiredAt,
      })),
    },
    recentActivities,
  };
};

module.exports = {
  getDashboardStats,
};
