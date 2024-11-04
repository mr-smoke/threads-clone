import express from "express";
import {
  commentPost,
  createPost,
  deletePost,
  getFeed,
  getPersonalFeed,
  getPost,
  likePost,
  userPosts,
} from "../controllers/post.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", getFeed);
router.get("/personalFeed", protectRoute, getPersonalFeed);
router.get("/:id", getPost);
router.get("/user/:id", userPosts);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likePost);
router.post("/comment/:id", protectRoute, commentPost);

export default router;
