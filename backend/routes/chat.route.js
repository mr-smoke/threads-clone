import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getConversations } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/", protectRoute, getConversations);

export default router;
