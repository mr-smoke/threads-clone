import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const getConversations = async (req, res) => {
  const userId = req.user._id;

  try {
    const conversations = await Conversation.find({ userIds: userId });
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
      content: req.body.text,
    });

    newMessage.save();

    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  const conversationId = req.params.conversationId;

  try {
    const messages = await Message.find({ conversationId }).createdAt("asc");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
