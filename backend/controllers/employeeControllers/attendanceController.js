const Attendance = require("../../models/attendanceModel");
const Employee = require("../../models/userModel");
const moment = require("moment");

const SHIFT_TIMES = {
  day: { start: "09:00 AM", end: "05:00 PM", halfDayHours: 4.5 },
  night: { start: "08:00 PM", end: "04:00 AM", halfDayHours: 4.5 },
};

const checkIn = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const shiftType = req.shiftType || "day";
    const date = moment().format("YYYY-MM-DD");
    const now = moment();

    const dayOfWeek = now.day();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.status(403).json({
        message: "Today is a weekend! No office work.",
      });
    }

    const existing = await Attendance.findOne({ employeeId, date });
    if (existing && existing.checkIn) {
      return res.status(400).json({ message: "Already checked in today." });
    }

    const shiftStart = moment(SHIFT_TIMES[shiftType].start, "hh:mm A");
    const shiftEnd = moment(SHIFT_TIMES[shiftType].end, "hh:mm A");

    if (shiftType === "night") shiftEnd.add(1, "day");

    if (now.isBefore(shiftStart)) {
      return res.status(403).json({
        message: `You can check in only after ${SHIFT_TIMES[shiftType].start}`,
      });
    }

    if (now.isAfter(shiftEnd)) {
      return res.status(403).json({ message: "Shift hours ended!" });
    }

    const gracePeriod = moment(shiftStart).add(10, "minutes");
    let status = "Present";
    if (now.isAfter(gracePeriod)) status = "Late";

    const attendance = await Attendance.create({
      employeeId,
      date,
      shiftType,
      checkIn: now.format("hh:mm A"),
      status,
    });

    res.status(200).json({ message: "Checked in!", attendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkOut = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const shiftType = req.shiftType || "day";
    const date = moment().format("YYYY-MM-DD");

    const attendance = await Attendance.findOne({ employeeId, date });
    if (!attendance || !attendance.checkIn) {
      return res.status(400).json({ message: "No check-in today" });
    }
    if (attendance.checkOut) {
      return res.status(400).json({ message: "Already checked out" });
    }

    const now = moment();
    const checkInTime = moment(attendance.checkIn, "hh:mm A");
    let checkOutTime = moment(now.format("hh:mm A"), "hh:mm A");

    if (
      attendance.shiftType === "night" &&
      checkOutTime.isBefore(checkInTime)
    ) {
      checkOutTime.add(1, "day");
    }

    const duration = moment.duration(checkOutTime.diff(checkInTime));
    const totalHours = parseFloat(duration.asHours().toFixed(2));
    attendance.checkOut = now.format("hh:mm A");
    attendance.totalHours = totalHours;

    const standardHours = 9;
    const halfDayMin = 4.5;

    if (totalHours < halfDayMin) {
      attendance.status = "Absent";
      attendance.isHalfDay = false;
      attendance.overtimeHours = 0;
    } else if (totalHours < standardHours) {
      attendance.status = "Half Day";
      attendance.isHalfDay = true;
      attendance.overtimeHours = 0;
    } else if (totalHours === standardHours) {
      attendance.status = "Present";
      attendance.isHalfDay = false;
      attendance.overtimeHours = 0;
    } else if (totalHours > standardHours) {
      attendance.status = "Overtime";
      attendance.isHalfDay = false;
      attendance.overtimeHours = parseFloat(
        (totalHours - standardHours).toFixed(2)
      );
    }

    await attendance.save();
    res.status(200).json({ message: "Checked out!", attendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

    // 1️⃣ Find employee to get joining date
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const joiningDate = moment(employee.joiningDate);
    const today = moment();

    // 2️⃣ If employee joins in the future
    if (joiningDate.isAfter(today)) {
      return res.status(200).json({ success: true, attendance: [] });
    }

    // 3️⃣ Get all attendance records from joining date → today
    const records = await Attendance.find({
      employeeId,
      date: {
        $gte: joiningDate.format("YYYY-MM-DD"),
        $lte: today.format("YYYY-MM-DD"),
      },
    }).sort({ date: -1 });

    // 4️⃣ Map records by date for quick lookup
    const recordMap = {};
    records.forEach((r) => (recordMap[r.date] = r));

    // 5️⃣ Build full list of working days
    const allDays = [];
    for (let d = moment(joiningDate); d.isSameOrBefore(today); d.add(1, "day")) {
      const dateStr = d.format("YYYY-MM-DD");
      const day = d.day();
      if (day === 0 || day === 6) continue; // skip weekends

      if (recordMap[dateStr]) {
        const record = recordMap[dateStr];

        // ✅ Calculate total display
        let totalDisplay = "--";

        if (
          (record.status === "Present" || record.status === "Late") &&
          record.checkIn &&
          (!record.checkOut || record.checkOut === "--")
        ) {
          // 🕒 Employee checked in but not checked out → calculate till now
          const checkInTime = moment(record.checkIn, "hh:mm A");
          const currentTime = moment();
          const diffHours = moment.duration(currentTime.diff(checkInTime)).asHours();
          const h = Math.floor(diffHours);
          const m = Math.round((diffHours - h) * 60);
          totalDisplay = `${h}h ${m}m`;
        } else if (record.totalHours && record.totalHours > 0) {
          // Normal case: already checked out
          const hours = Math.floor(record.totalHours);
          const minutes = Math.round((record.totalHours - hours) * 60);
          totalDisplay = `${hours}h ${minutes}m`;
        } else if (record.status === "Absent") {
          totalDisplay = "0h 0m";
        }

        allDays.push({
          _id: record._id,
          employeeId: record.employeeId,
          date: record.date,
          checkIn: record.checkIn || "--",
          checkOut: record.checkOut || "--",
          totalDisplay,
          status: record.status || "Absent",
        });
      } else {
        allDays.push({
          _id: `absent-${dateStr}`,
          employeeId,
          date: dateStr,
          checkIn: "--",
          checkOut: "--",
          totalDisplay: "0h 0m",
          status: "Absent",
        });
      }
    }

    // 6️⃣ Sort latest → oldest
    allDays.sort((a, b) => (a.date < b.date ? 1 : -1));

    // 7️⃣ Send response
    res.status(200).json({
      success: true,
      attendance: allDays,
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
