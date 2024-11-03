import express from "express";
import {
  followUser,
  getUser,
  login,
  logout,
  signup,
  updateUser,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile/:query", getUser);
router.post("/update/:userId", updateUser);
router.post("/follow/:followId", protectRoute, followUser);

export default router;
