import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).exec();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const createPost = async (req, res) => {
  try {
    const { caption, userId } = req.body;
    const newPost = new Post({ caption, userId });
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
