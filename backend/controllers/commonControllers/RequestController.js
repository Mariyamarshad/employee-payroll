const Request = require("../../models/requestModel");
const moment = require("moment");

exports.createRequest = async (req, res) => {
  try {
    const { subject, message, recieverId } = req.body;

    if (!subject || !message || !recieverId) {
      return res.status(400).json({ error: "Subject, message, and recieverId are required" });
    }

    const participants = [req.user.id, recieverId];

    const request = await Request.create({
      participants,
      subject,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      messages: [
        {
          senderId: req.user.id,
          message,
          sentAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
      ],
    });

    res.status(201).json(request);
  } catch (err) {
    console.error("createRequest:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.replyRequest = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params;

    if (!message) return res.status(400).json({ error: "Message is required" });

    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ error: "Request not found" });

    request.messages.push({
      senderId: req.user.id,
      message,
      sentAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    if (request.status === "resolved") request.status = "open";

    await request.save();

    res.json(request);
  } catch (err) {
    console.error("replyRequest:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const filter = req.user.role === "admin"
      ? {}
      : { participants: req.user.id };

    const requests = await Request.find(filter)
      .populate("participants", "name email role")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("getRequests:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findById(id)
      .populate("participants", "name email role")
      .populate("messages.senderId", "name email role");

    if (!request) return res.status(404).json({ error: "Request not found" });

    const isParticipant = request.participants.some(
      (p) => String(p._id) === String(req.user.id)
    );

    if (!isParticipant && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not allowed to view this request" });
    }

    res.json(request);
  } catch (err) {
    console.error("getRequestById:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["open", "resolved"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ error: "Request not found" });

    const isParticipant = request.participants.some(
      (p) => String(p) === String(req.user.id)
    );

    if (!isParticipant && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not allowed to change status" });
    }

    request.status = status;
    await request.save();

    res.json(request);
  } catch (err) {
    console.error("updateStatus:", err);
    res.status(500).json({ error: err.message });
  }
};
