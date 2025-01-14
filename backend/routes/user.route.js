import express from "express";
import {
  followUser,
  freeze,
  getAuthUser,
  getUser,
  login,
  logout,
  signup,
  updateUser,
  changePassword,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile/:query", getUser);
router.put("/update/:userId", protectRoute, updateUser);
router.put("/changePassword/:userId", protectRoute, changePassword);
router.post("/follow/:followId", protectRoute, followUser);
router.get("/getAuthUser", protectRoute, getAuthUser);
router.post("/freeze", protectRoute, freeze);

export default router;
