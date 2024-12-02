import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  getConversations,
  sendMessage,
  getMessages,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/", protectRoute, getConversations);
router.get("/:receiverId", protectRoute, getMessages);
router.post("/sendMessage/:receiverId", protectRoute, sendMessage);

export default router;
