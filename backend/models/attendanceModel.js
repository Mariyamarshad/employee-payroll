const mongoose =  require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  shiftType: {
    type: String,
    enum: ["day", "night"],
    default: "day",
  },
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Present", "Late", "Absent", "Overtime", "Half Day"],
    default: "Present",
  },
  isHalfDay: {
    type: Boolean,
    default: false,
  },
  totalHours: {
    type: Number,
    default: 0,
  },
  overtimeHours: {
    type: Number,
    default: 0,
  },
  autoCheckOut: {
    type: Boolean,
    default: false,
  },
});

module.exports =  mongoose.model("Attendance", attendanceSchema);