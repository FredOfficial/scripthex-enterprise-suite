const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const {
  getAttendances,
  timeIn,
  timeOut,
} = require("../controllers/attendanceController");

const router = express.Router();

router.get("/", authMiddleware, getAttendances);
router.post("/time-in", authMiddleware, timeIn);
router.put("/:id/time-out", authMiddleware, timeOut);

module.exports = router;
