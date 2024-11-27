import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  getConversations,
  sendMessage,
  getMessages,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/", protectRoute, getConversations);
router.post("/sendMessage/:receiverId", protectRoute, sendMessage);
router.get("/getMessages/:conversationId", protectRoute, getMessages);

export default router;
