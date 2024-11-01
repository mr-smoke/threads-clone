import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
      maxLength: 25,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    name: {
      type: String,
      required: true,
      maxLength: 25,
    },
    img: {
      type: String,
      default: "/noavatar.png",
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
      maxLength: 100,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
