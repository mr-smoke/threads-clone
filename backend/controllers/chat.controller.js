import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { v2 as cloudinary } from "cloudinary";

export const getConversations = async (req, res) => {
  const userId = req.user._id;
  const limit = parseInt(req.query.limit) || 14;
  const offset = parseInt(req.query.offset) || 0;

  try {
    let conversations = await Conversation.find({ userIds: userId })
      .populate({
        path: "userIds",
        select: "username img",
      })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip(offset);

    conversations = conversations.map((conversation) => {
      const user = conversation.userIds.find(
        (user) => user._id.toString() !== userId.toString()
      );
      return {
        _id: conversation._id,
        profilePic: user.img,
        name: user.username,
        userId: user._id,
      };
    });

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  const userId = req.user._id;
  const receiverId = req.params.receiverId;
  const { text, images } = req.body;
  let img = [];

  try {
    if (userId.toString() === receiverId.toString()) {
      return res.status(400).json({ error: "You cannot message yourself" });
    }

    if (receiverId.length !== 24) {
      return res.status(400).json({ error: "Invalid receiver id" });
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    if (!text && images.length === 0) {
      return res.status(400).json({ error: "Text or image is required" });
    }

    let conversation = await Conversation.findOne({
      userIds: { $all: [userId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        userIds: [userId, receiverId],
      });
      await conversation.save();
    }

    if (images && images.length > 0) {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image)
      );
      const uploadedResponses = await Promise.all(uploadPromises);
      img = uploadedResponses.map((response) => response.secure_url);
    }

    let newMessage = new Message({
      conversationId: conversation._id,
      senderId: userId,
      text,
      img,
    });

    newMessage.save();

    newMessage = await newMessage.populate({
      path: "senderId",
      select: "username img",
    });

    const receiverSocket = getReceiverSocketId(receiverId);
    if (receiverSocket) {
      io.to(receiverSocket).emit("newMessage", newMessage);
    }

    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  const receiverId = req.params.receiverId;
  const userId = req.user._id;
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    if (userId.toString() === receiverId.toString()) {
      return res.status(400).json({ error: "You cannot message yourself" });
    }

    if (receiverId.length !== 24) {
      return res.status(400).json({ error: "Invalid receiver id" });
    }

    const conversation = await Conversation.findOne({
      userIds: { $all: [userId, receiverId] },
    });

    const messages = await Message.find({
      conversationId: conversation?._id,
    })
      .populate({
        path: "senderId",
        select: "username img",
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
