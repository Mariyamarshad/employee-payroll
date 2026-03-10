const mongoose = require("mongoose");
const moment = require("moment");

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  sentAt: { type: String, default: () => moment().format("YYYY-MM-DD HH:mm:ss") }
});

const requestSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  subject: { type: String, required: true },
  messages: [messageSchema],
  status: {
    type: String,
    enum: ["open", "resolved"],
    default: "open"
  },
  createdAt: {
    type: String,
    default: () => moment().format("YYYY-MM-DD HH:mm:ss")
  }
});

module.exports = mongoose.model("Request", requestSchema);
