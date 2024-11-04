import express from "express";
import {
  createPost,
  getPost,
  getPosts,
  userPosts,
} from "../controllers/post.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", getPosts);
router.post("/create", protectRoute, createPost);
router.get("/:id", getPost);
router.get("/user/:id", userPosts);

export default router;
