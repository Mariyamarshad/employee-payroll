const Attendance = require("../../models/attendanceModel");

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
    if (!attendance) {
      return res.status(400).json({ message: "Check-in first." });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({ message: "Already checked out." });
    }

    const checkOutTime = getCurrentTime();
    const diffMs = checkOutTime - new Date(attendance.checkInTime);
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    const totalHours = `${hours}h ${minutes}m`;

    attendance.checkOutTime = checkOutTime;
    attendance.totalHours = totalHours;
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
    res.status(200).json(record || {});
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
