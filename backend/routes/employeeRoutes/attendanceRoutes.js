const express = require("express");
const router = express.Router();
const {
  checkIn,
  checkOut,
  getUserAttendance, 
  getTodayAttendance,
  getAllAttendance,
} = require("../../controllers/employeeControllers/attendanceController");
const { authMiddleware, verifyAdmin } = require("../../middlewares/AuthMiddleware");

router.post("/checkin",authMiddleware, checkIn);
router.post("/checkout",authMiddleware, checkOut);
router.get("/all",authMiddleware, verifyAdmin, getAllAttendance); 
router.get("/:userId", getUserAttendance);
router.get("/:userId/today", getTodayAttendance);

module.exports = router;
