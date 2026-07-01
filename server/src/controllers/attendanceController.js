const attendanceService = require("../services/attendanceService");
const activityService = require("../services/activityService");

const getAttendances = async (req, res) => {
  try {
    const attendances = await attendanceService.getAttendances();

    res.json({
      message: "Attendances fetched successfully.",
      data: attendances,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendances.",
      error: error.message,
    });
  }
};

const timeIn = async (req, res) => {
  try {
    const attendance = await attendanceService.timeIn(req.body);

    await activityService.createActivity({
      action: "CREATE",
      module: "ATTENDANCE",
      actor: req.user && req.user.name ? req.user.name : "System Administrator",
      description: `recorded time in for employee ID ${attendance.employeeId}`,
    });

    res.status(201).json({
      message: "Time in recorded successfully.",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to record time in.",
      error: error.message,
    });
  }
};

const timeOut = async (req, res) => {
  try {
    const attendance = await attendanceService.timeOut(req.params.id);

    await activityService.createActivity({
      action: "UPDATE",
      module: "ATTENDANCE",
      actor: req.user && req.user.name ? req.user.name : "System Administrator",
      description: `recorded time out for employee ID ${attendance.employeeId}`,
    });

    res.json({
      message: "Time out recorded successfully.",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to record time out.",
      error: error.message,
    });
  }
};

module.exports = {
  getAttendances,
  timeIn,
  timeOut,
};
