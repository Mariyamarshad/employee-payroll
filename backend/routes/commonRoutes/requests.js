const express = require("express");
const router = express.Router();

const requestsCtrl = require("../../controllers/commonControllers/RequestController");

const { authMiddleware } = require("../../middlewares/AuthMiddleware");

// FIX: use authMiddleware instead of "auth"
router.post("/", authMiddleware, requestsCtrl.createRequest);
router.post("/:id/reply", authMiddleware, requestsCtrl.replyRequest);
router.get("/", authMiddleware, requestsCtrl.getRequests);
router.get("/:id", authMiddleware, requestsCtrl.getRequestById);
router.patch("/:id/status", authMiddleware, requestsCtrl.updateStatus);

module.exports = router;
