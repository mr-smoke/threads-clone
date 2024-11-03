import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password").exec();

    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

export default protectRoute;
