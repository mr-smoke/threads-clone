import express from "express";
import {
  getUser,
  login,
  logout,
  signup,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile/:query", getUser);

export default router;
