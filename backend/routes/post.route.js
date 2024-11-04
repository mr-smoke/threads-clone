import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  likePost,
  userPosts,
} from "../controllers/post.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", getPosts);
router.post("/create", protectRoute, createPost);
router.get("/:id", getPost);
router.get("/user/:id", userPosts);
router.delete("/delete/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likePost);

export default router;
