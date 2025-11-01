const cron = require("node-cron");
const moment = require("moment");
const Attendance = require("../models/attendanceModel.js");
const Employee = require("../models/userModel.js");

const scheduleAttendanceJob = () => {
  cron.schedule(
    "59 23 * * *",
    async () => {
      try {
        const today = moment().format("YYYY-MM-DD");

        const dayOfWeek = moment().day();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          console.log("Weekend — no auto processing.");
          return;
        }

        const allEmployees = await Employee.find();

        for (const emp of allEmployees) {
          let record = await Attendance.findOne({
            employeeId: emp._id,
            date: today,
          });

          if (!record) {
            await Attendance.create({
              employeeId: emp._id,
              date: today,
              status: "Absent",
              totalHours: 0,
              overtimeHours: 0,
            });
            continue;
          }

          const shiftStart = emp.shiftType === "night"
            ? moment("08:00 PM", "hh:mm A")
            : moment("09:00 AM", "hh:mm A");

          const shiftEnd = emp.shiftType === "night"
            ? moment("04:00 AM", "hh:mm A").add(1, "day")
            : moment("05:00 PM", "hh:mm A");

          if (record.checkIn && !record.checkOut) {
            record.checkOut = shiftEnd.format("hh:mm A");
            record.autoCheckOut = true;
          }

          if (record.checkIn && record.checkOut) {
            const checkInTime = moment(record.checkIn, "hh:mm A");
            const checkOutTime = moment(record.checkOut, "hh:mm A");

            const duration = moment.duration(checkOutTime.diff(checkInTime));
            const workedHours = parseFloat(duration.asHours().toFixed(2));
            record.totalHours = workedHours;

            if (workedHours >= 9) {
              record.status = "Present";
            } else if (workedHours >= 4) {
              record.status = "Half Day";
            } else {
              record.status = "Absent";
            }

            if (workedHours > 9) {
              record.status = "Overtime";
              record.overtimeHours = parseFloat(
                (workedHours - 9).toFixed(2)
              );
            }

            await record.save();
          }
        }

        console.log(`Daily Attendance Job Completed for ${today}`);
      } catch (err) {
        console.error(" Error in Daily Attendance Job:", err);
      }
    },
    { timezone: "Asia/Karachi" }
  );
};

module.exports = { scheduleAttendanceJob };
