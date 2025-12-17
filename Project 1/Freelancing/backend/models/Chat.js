import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  messages: { type: Array, default: [] },
});

export default mongoose.model("Chat", chatSchema);
