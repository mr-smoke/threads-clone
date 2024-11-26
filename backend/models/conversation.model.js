import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    userIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
