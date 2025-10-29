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
        const standardHours = 9;
        const officeEndTime = moment("18:00", "HH:mm"); 

        const allEmployees = await Employee.find();

        for (const emp of allEmployees) {
          let record = await Attendance.findOne({ employeeId: emp._id, date: today });

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

          if (record.checkIn && !record.checkOut) {
            record.checkOut = officeEndTime.format("hh:mm A");
            record.autoCheckOut = true;
          }

          if (record.checkIn && record.checkOut) {
            const checkInTime = moment(record.checkIn, "hh:mm A");
            const checkOutTime = moment(record.checkOut, "hh:mm A");
            const duration = moment.duration(checkOutTime.diff(checkInTime));
            const totalHours = parseFloat(duration.asHours().toFixed(2));

            record.totalHours = totalHours;

            const lateThreshold = moment("09:15", "HH:mm");
            if (checkInTime.isAfter(lateThreshold)) {
              record.status = "Late";
            }

            if (totalHours > standardHours) {
              record.status = "Overtime";
              record.overtimeHours = parseFloat((totalHours - standardHours).toFixed(2));
            }

            if (!record.status || record.status === "Present") {
              record.status = "Present";
            }

            await record.save();
          }
        }

        console.log(` Daily attendance job completed for ${today}`);
      } catch (err) {
        console.error(" Error in daily attendance cron job:", err);
      }
    },
    { timezone: "Asia/Karachi" }
  );
};

module.exports = { scheduleAttendanceJob }
