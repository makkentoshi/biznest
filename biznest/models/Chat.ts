// models/Chat.ts
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Chat || mongoose.model('Chat', chatSchema);