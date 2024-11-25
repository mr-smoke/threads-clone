import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import bcrypt from "bcryptjs";
import tokenization from "../utils/tokenization.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

export const signup = async (req, res) => {
  try {
    const { email, username, password, name, confirmPassword } = req.body;

    if (!email || !username || !password || !name || !confirmPassword) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const user = await User.findOne({ $or: [{ email }, { username }] }).exec();
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
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

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (user.isFrozen) {
      user.isFrozen = false;
      await user.save();
    }

    tokenization(user._id, res);

    return res.status(200).json(user);
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
      user = await User.findById(query)
        .select("-password")
        .select("-updatedAt")
        .exec();
    } else {
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-updatedAt")
        .exec();
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const updateUser = async (req, res) => {
  const { name, username, email, bio, image } = req.body;
  const userId = req.user._id;
  let img;

  try {
    const user = await User.findById(userId).exec();

    if (req.params.userId !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.email === email && user.username === username) {
      var isExistingUser = false;
    } else {
      isExistingUser = await User.findOne({
        $or: [{ email }, { username }],
      }).exec();
    }

    if (isExistingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    if (image) {
      if (user.img) {
        const publicId = user.img.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadedResponse = await cloudinary.uploader.upload(image);
      img = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.img = img || user.img;

    await user.save();

    await Post.updateMany(
      { "replies.userId": userId },
      {
        $set: {
          "replies.$[reply].username": user.username,
          "replies.$[reply].img": user.img,
        },
      },
      { arrayFilters: [{ "reply.userId": userId }] }
    );

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const followUser = async (req, res) => {
  const { followId } = req.params;
  const userId = req.user._id;

  try {
    if (userId.toString() === followId) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    const user = await User.findById(userId).exec();
    const followUser = await User.findById(followId).exec();

    if (!user || !followUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const isFollowing = user.following.includes(followId);

    if (isFollowing) {
      await user.updateOne({ $pull: { following: followId } });
      await followUser.updateOne({ $pull: { followers: userId } });

      return res.status(200).json("User unfollowed successfully");
    } else {
      await user.updateOne({ $push: { following: followId } });
      await followUser.updateOne({ $push: { followers: userId } });

      return res.status(200).json("User followed successfully");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getAuthUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).exec();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const freeze = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).exec();

    user.isFrozen = true;
    await user.save();

    res.clearCookie("token");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
