import Conversation from "../models/conversation.model.js";

export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ userIds: req.userId });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
