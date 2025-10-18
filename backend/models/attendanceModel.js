const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String, 
    required: true,
  },
  checkInTime: Date,
  checkOutTime: Date,
  totalHours: String,
  standardHours: { type: String, default: "8h 0m" },
  overtime: { type: String, default: "0h 0m" },
  overtimeHours: { type: Number, default: 0 },   
  overtimeMinutes: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Present", "Absent", "Half Day", "Work From Home"],
    default: "Present",
  },
}, { timestamps: true });

attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
