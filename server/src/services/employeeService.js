const prisma = require("../config/prisma");

const getEmployees = async () => {
  return prisma.employee.findMany({
    include: {
      department: true,
      position: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createEmployee = async (data) => {
  return prisma.employee.create({
    data: {
      employeeNo: data.employeeNo,
      firstName: data.firstName,
      middleName: data.middleName || null,
      lastName: data.lastName,
      suffix: data.suffix || null,
      email: data.email || null,
      phone: data.phone || null,
      gender: data.gender || null,
      address: data.address || null,
      departmentId: data.departmentId ? Number(data.departmentId) : null,
      positionId: data.positionId ? Number(data.positionId) : null,
      employmentType: data.employmentType || "FULL_TIME",
      status: data.status || "ACTIVE",
      hiredAt: new Date(data.hiredAt),
      salary: data.salary ? Number(data.salary) : null,
    },
  });
};

const updateEmployee = async (id, data) => {
  return prisma.employee.update({
    where: {
      id: Number(id),
    },
    data: {
      employeeNo: data.employeeNo,
      firstName: data.firstName,
      middleName: data.middleName || null,
      lastName: data.lastName,
      suffix: data.suffix || null,
      email: data.email || null,
      phone: data.phone || null,
      gender: data.gender || null,
      address: data.address || null,
      departmentId: data.departmentId ? Number(data.departmentId) : null,
      positionId: data.positionId ? Number(data.positionId) : null,
      employmentType: data.employmentType || "FULL_TIME",
      status: data.status || "ACTIVE",
      hiredAt: new Date(data.hiredAt),
      salary: data.salary ? Number(data.salary) : null,
    },
  });
};

const deleteEmployee = async (id) => {
  return prisma.employee.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
