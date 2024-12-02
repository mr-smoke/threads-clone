import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const getConversations = async (req, res) => {
  const userId = req.user._id;

  try {
    let conversations = await Conversation.find({ userIds: userId }).populate({
      path: "userIds",
      select: "username img",
    });

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

  try {
    let conversation = await Conversation.findOne({
      userIds: { $all: [userId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        userIds: [userId, receiverId],
      });
      await conversation.save();
    }

    const newMessage = new Message({
      conversationId: conversation._id,
      senderId: userId,
      content: req.body.message,
    });

    newMessage.save();

    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  const receiverId = req.params.receiverId;
  const userId = req.user._id;

  try {
    const conversation = await Conversation.findOne({
      userIds: { $all: [userId, receiverId] },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const messages = await Message.find({
      conversationId: conversation._id,
    }).populate({
      path: "senderId",
      select: "username img",
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
