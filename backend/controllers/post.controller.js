import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).exec();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const createPost = async (req, res) => {
  const userId = req.user._id;

  try {
    const { caption, images } = req.body;
    let img = [];

    if (!caption && images.length === 0) {
      return res.status(400).json({ error: "Caption or image is required" });
    }

    if (images && images.length > 0) {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image)
      );
      const uploadedResponses = await Promise.all(uploadPromises);
      img = uploadedResponses.map((response) => response.secure_url);
    }

    const newPost = new Post({ caption, img, userId });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id }).exec();

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const userPosts = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.find({ userId: id })
      .sort({ createdAt: -1 })
      .exec();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const post = await Post.findOne({ _id: id }).exec();

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.userId.toString() !== userId.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { img, username, id: userId } = req.user;

  try {
    const post = await Post.findOne({ _id: id }).exec();

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const isLiked = post.likes.find(
      (like) => like.userId.toString() === userId.toString()
    );
    if (isLiked) {
      post.likes = post.likes.filter(
        (like) => like.userId.toString() !== userId.toString()
      );
      await post.save();
      return res.status(200).json({ message: "Unliked" });
    } else {
      post.likes.push({ userId, img, username });
      await post.save();
      return res.status(200).json({ message: "Liked" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { img, username, id: userId } = req.user;

  try {
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ error: "Comment is required" });
    }

    const post = await Post.findOne({ _id: id }).exec();

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push({ userId, comment, img, username });
    await post.save();
    return res.status(200).json("Comment added");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getPersonalFeed = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).exec();

    const following = user.following;
    const posts = await Post.find({ userId: { $in: following } })
      .sort({ createdAt: -1 })
      .exec();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
