const Employee = require("../models/userModel");

const attendanceValidation = async (req, res, next) => {
  try {
    const { employeeId, shiftType = "day" } = req.body;

    if (!employeeId) {
      return res.status(400).json({ message: "employeeId is required" });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (!["day", "night"].includes(shiftType)) {
      return res.status(400).json({ message: "Invalid shiftType. Use 'day' or 'night'." });
    }

    req.shiftType = shiftType;
    next();
  } catch (error) {
    console.error("Attendance validation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { attendanceValidation };
