const prisma = require("../config/prisma");

const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

const getAttendances = async () => {
  return prisma.attendance.findMany({
    include: {
      employee: {
        include: {
          department: true,
          position: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
};

const timeIn = async (data) => {
  const now = new Date();
  const { start, end } = getTodayRange();

  const existingAttendance = await prisma.attendance.findFirst({
    where: {
      employeeId: Number(data.employeeId),
      date: {
        gte: start,
        lte: end,
      },
    },
  });

  if (existingAttendance) {
    throw new Error("Employee already timed in today.");
  }

  return prisma.attendance.create({
    data: {
      employeeId: Number(data.employeeId),
      date: now,
      timeIn: now,
      status: data.status || "PRESENT",
      remarks: data.remarks || null,
    },
    include: {
      employee: true,
    },
  });
};

const timeOut = async (id) => {
  const attendance = await prisma.attendance.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      employee: true,
    },
  });

  if (!attendance) {
    throw new Error("Attendance record not found.");
  }

  if (!attendance.timeIn) {
    throw new Error("Employee has no time in record.");
  }

  if (attendance.timeOut) {
    throw new Error("Employee already timed out.");
  }

  return prisma.attendance.update({
    where: {
      id: Number(id),
    },
    data: {
      timeOut: new Date(),
    },
    include: {
      employee: true,
    },
  });
};

module.exports = {
  getAttendances,
  timeIn,
  timeOut,
};
