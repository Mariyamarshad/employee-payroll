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
router.get("/all", authMiddleware, verifyAdmin, getAllAttendance); 
router.get("/summary/:userId", authMiddleware, getAttendanceSummary);
router.get("/:userId/today", authMiddleware, getTodayAttendance);
router.get("/:userId", authMiddleware, getUserAttendance);



module.exports = router;
