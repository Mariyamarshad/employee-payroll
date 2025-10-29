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
const { authMiddleware, verifyAdmin } = require("../../middlewares/AuthMiddleware");

router.post("/checkin",authMiddleware, checkIn);

router.post("/checkout",authMiddleware, checkOut);

router.get("/:employeeId/today", authMiddleware, getTodayAttendance);

router.get("/summary/:employeeId", getAttendanceSummary)

router.get("/:employeeId/all", getAllAttendance)

module.exports = router;
