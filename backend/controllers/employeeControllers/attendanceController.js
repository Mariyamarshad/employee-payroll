const Attendance = require("../../models/attendanceModel");
const moment = require("moment");

const checkIn = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const date = moment().format("YYYY-MM-DD");

    const existing = await Attendance.findOne({ employeeId, date });
    if (existing && existing.checkIn) {
      return res.status(400).json({ message: "Already checked in today." });
    }

    // Office Hours
    const officeStartTime = moment("09:00 AM", "hh:mm A");
    const officeEndTime = moment("05:00 PM", "hh:mm A"); 

    const now = moment(); 

    // ⛔ Block check-in if office day is over
    if (now.isAfter(officeEndTime)) {
      return res.status(403).json({
        message: "Office hours have ended! You cannot check-in now.",
      });
    }

    // ✅ Allow late check-in before cutoff
    const checkInTime = now.format("hh:mm A");
    const status = now.isAfter(officeStartTime) ? "Late" : "Present";

    const attendance = await Attendance.create({
      employeeId,
      date,
      checkIn: checkInTime,
      status,
    });

    res.status(200).json({
      message: "Checked in successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const checkOut = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const date = moment().format("YYYY-MM-DD");

    const attendance = await Attendance.findOne({ employeeId, date });
    if (!attendance || !attendance.checkIn) {
      return res.status(400).json({ message: "No check-in found for today." });
    }
    if (attendance.checkOut) {
      return res.status(400).json({ message: "Already checked out today." });
    }

    const checkOutTime = moment().format("hh:mm A");
    const checkInMoment = moment(attendance.checkIn, "hh:mm A");
    const checkOutMoment = moment(checkOutTime, "hh:mm A");

    const duration = moment.duration(checkOutMoment.diff(checkInMoment));
    const totalHours = parseFloat(duration.asHours().toFixed(2));

    attendance.checkOut = checkOutTime;
    attendance.totalHours = totalHours;

    const standardHours = 9;
    if (totalHours > standardHours) {
      attendance.status = "Overtime";
      attendance.overtimeHours = parseFloat(
        (totalHours - standardHours).toFixed(2)
      );
    }

    await attendance.save();

    res.status(200).json({
      message: "Checked out successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodayAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const date = moment().format("YYYY-MM-DD");

    const attendance = await Attendance.findOne({ employeeId, date });
    res.status(200).json({ attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBusinessDays = (startDate, endDate) => {
  let count = 0;
  let curDate = moment(startDate).clone();

  while (curDate.isSameOrBefore(endDate)) {
    const day = curDate.day();
    if (day !== 0 && day !== 6) count++;
    curDate.add(1, "day");
  }

  return count;
};

const getAttendanceSummary = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const records = await Attendance.find({ employeeId });

    if (!records.length) {
      return res.status(200).json({
        totalDaysPresent: 0,
        totalDaysAbsent: 0,
        overtimeHours: 0,
        lateArrivals: 0,
      });
    }

    const firstRecordDate = moment(records[0].date, "YYYY-MM-DD");
    const today = moment();

    const totalWorkingDays = getBusinessDays(firstRecordDate, today);

    let totalDaysPresent = 0;
    let overtimeHours = 0;
    let lateArrivals = 0;

    records.forEach((record) => {
      if (["Present", "Overtime", "Late"].includes(record.status)) {
        totalDaysPresent++;
      }

      if (record.overtimeHours) {
        overtimeHours += record.overtimeHours;
      }

      if (record.status === "Late") {
        lateArrivals++;
      }
    });

    const totalDaysAbsent = Math.max(0, totalWorkingDays - totalDaysPresent);

    res.status(200).json({
      totalDaysPresent,
      totalDaysAbsent,
      overtimeHours: parseFloat(overtimeHours.toFixed(2)),
      lateArrivals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const attendanceRecords = await Attendance.find({ employeeId }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      attendance: attendanceRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  checkIn,
  checkOut,
  getTodayAttendance,
  getAttendanceSummary,
  getAllAttendance,
};
