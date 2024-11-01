import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./backend/db/connection.js";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
