const prisma = require("../config/prisma");

const WORK_START_HOUR = 8;
const HALF_DAY_HOUR = 12;

const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

const computeStatusAndLate = (timeIn) => {
  const workStart = new Date(timeIn);
  workStart.setHours(WORK_START_HOUR, 0, 0, 0);

  const halfDayStart = new Date(timeIn);
  halfDayStart.setHours(HALF_DAY_HOUR, 0, 0, 0);

  if (timeIn >= halfDayStart) {
    return {
      status: "HALF_DAY",
      lateMinutes: Math.floor((timeIn - workStart) / 60000),
    };
  }

  if (timeIn > workStart) {
    return {
      status: "LATE",
      lateMinutes: Math.floor((timeIn - workStart) / 60000),
    };
  }

  return {
    status: "PRESENT",
    lateMinutes: 0,
  };
};

const computeWorkingHours = (timeIn, timeOut) => {
  const diffMs = new Date(timeOut) - new Date(timeIn);
  return Math.max(0, Math.floor(diffMs / 60000));
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

  const computed = computeStatusAndLate(now);

  return prisma.attendance.create({
    data: {
      employeeId: Number(data.employeeId),
      date: now,
      timeIn: now,
      status: computed.status,
      lateMinutes: computed.lateMinutes,
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

  const now = new Date();
  const workingHours = computeWorkingHours(attendance.timeIn, now);

  return prisma.attendance.update({
    where: {
      id: Number(id),
    },
    data: {
      timeOut: now,
      workingHours,
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
