const Attendance = require("../../models/attendanceModel");

const STANDARD_WORK_HOURS = 8;

const getCurrentTime = () => new Date();
const getCurrentDate = () => new Date().toISOString().split("T")[0];

exports.checkIn = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const date = getCurrentDate();

    const existing = await Attendance.findOne({ userId, date });
    if (existing) {
      return res.status(400).json({ message: "Already checked in today." });
    }

    const attendance = new Attendance({
      userId,
      date,
      checkInTime: getCurrentTime(),
      status: "Present",
      standardHours: `${STANDARD_WORK_HOURS}h 0m`,
      overtime: "0h 0m",
    });

    await attendance.save();
    res.status(200).json({ message: "Check-in successful", attendance });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const date = getCurrentDate();

    const attendance = await Attendance.findOne({ userId, date });
    if (!attendance) return res.status(400).json({ message: "Check-in first." });
    if (attendance.checkOutTime) return res.status(400).json({ message: "Already checked out." });

    const checkOutTime = getCurrentTime();
    const diffMs = checkOutTime - new Date(attendance.checkInTime);
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    const totalHours = `${hours}h ${minutes}m`;

    const overtimeMs = diffMs - STANDARD_WORK_HOURS * 3600000;
    let overtime = "0h 0m";
    let overtimeHours = 0;
    let overtimeMinutes = 0;

    if (overtimeMs > 0) {
      overtimeHours = Math.floor(overtimeMs / 3600000);
      overtimeMinutes = Math.floor((overtimeMs % 3600000) / 60000);
      overtime = `${overtimeHours}h ${overtimeMinutes}m`;
    }

    attendance.checkOutTime = checkOutTime;
    attendance.totalHours = totalHours;
    attendance.overtime = overtime;
    attendance.overtimeHours = overtimeHours;
    attendance.overtimeMinutes = overtimeMinutes;
    attendance.standardHours = `${STANDARD_WORK_HOURS}h 0m`;

    await attendance.save();

    res.status(200).json({ message: "Check-out successful", attendance });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.getUserAttendance = async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await Attendance.find({ userId }).sort({ date: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getTodayAttendance = async (req, res) => {
  try {
    const userId = req.params.userId;
    const date = getCurrentDate();
    const record = await Attendance.findOne({ userId, date });

    if (!record) return res.status(200).json({});

   
    if (record.checkInTime && !record.checkOutTime) {
      const now = new Date();
      const diffMs = now - new Date(record.checkInTime);
      const hours = Math.floor(diffMs / 3600000);
      const minutes = Math.floor((diffMs % 3600000) / 60000);

      const totalHours = `${hours}h ${minutes}m`;
      const overtimeMs = diffMs - STANDARD_WORK_HOURS * 3600000;

      let overtime = "0h 0m";
      if (overtimeMs > 0) {
        const overtimeHours = Math.floor(overtimeMs / 3600000);
        const overtimeMinutes = Math.floor((overtimeMs % 3600000) / 60000);
        overtime = `${overtimeHours}h ${overtimeMinutes}m`;
      }

      record.totalHours = totalHours;
      record.overtime = overtime;
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("userId", "name email role department designation")
      .sort({ date: -1 });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getAttendanceSummary = async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await Attendance.find({ userId });

    const daysPresent = records.filter(r => r.status === "Present").length;
    const totalOvertimeMinutes = records.reduce((sum, r) => {
      const h = r.overtimeHours || 0;
      const m = r.overtimeMinutes || 0;
      return sum + (h * 60 + m);
    }, 0);

    const overtimeHours = Math.floor(totalOvertimeMinutes / 60);
    const overtimeMinutes = totalOvertimeMinutes % 60;

    res.status(200).json({
      daysPresent,
      totalRecords: records.length,
      overtime: `${overtimeHours}h ${overtimeMinutes}m`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
