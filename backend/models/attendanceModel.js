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
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Present", "Late", "Absent", "Overtime"],
    default: "Present",
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