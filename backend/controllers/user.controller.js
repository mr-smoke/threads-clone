import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import tokenization from "../utils/tokenization.js";

export const signup = async (req, res) => {
  try {
    const { email, username, password, name, confirmPassword } = req.body;

    if (!email || !username || !password || !name || !confirmPassword) {
      return res.status(400).send("All input is required");
    }

    const user = await User.findOne({ $or: [{ email }, { username }] }).exec();
    if (user) {
      return res.status(400).send("User already registered");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Password does not match");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      name,
    });

    await newUser.save();
    tokenization(newUser._id, res);
    return res.status(201).send("User created successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).send("User not registered");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    tokenization(user._id, res);

    return res.status(200).send("User logged in successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
