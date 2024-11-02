import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import tokenization from "../utils/tokenization.js";
import mongoose from "mongoose";

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

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).send("User logged out successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getUser = async (req, res) => {
  const { query } = req.params;
  try {
    let user;

    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findById(query).exec();
    } else {
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-updatedAt")
        .exec();
    }

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const updateUser = async (req, res) => {
  const { name, username, email } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isExistingUser = await User.findOne({
      $or: [{ email }, { username }],
    }).exec();
    if (isExistingUser) {
      return res.status(400).send("User already registered");
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();
    return res.status(200).send("User updated successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
