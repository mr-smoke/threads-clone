import express from "express";
import {
  createPost,
  getPost,
  getPosts,
  userPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/feed", getPosts);
router.post("/create", createPost);
router.get("/:id", getPost);
router.get("/user/:id", userPosts);

export default router;
