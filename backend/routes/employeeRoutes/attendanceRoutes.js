const express = require("express");
const router = express.Router();
const {
  checkIn,
  checkOut,
  getUserAttendance, 
  getTodayAttendance,
  getAllAttendance,
  getAttendanceSummary,
} = require("../../controllers/employeeControllers/attendanceController");
const { authMiddleware } = require("../../middlewares/AuthMiddleware");
const { attendanceValidation } = require("../../middlewares/AttendanceValidation")

router.post("/checkin",authMiddleware, attendanceValidation, checkIn);

router.post("/checkout",authMiddleware,attendanceValidation, checkOut);

router.get("/:employeeId/today", authMiddleware, getTodayAttendance);

router.get("/summary/:employeeId", getAttendanceSummary)

router.get("/:employeeId/all", getAllAttendance)

module.exports = router;
