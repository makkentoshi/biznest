import mongoose from 'mongoose';

const userResponseSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true },  // ID пользователя из Clerk
  question: { type: String, required: true },    // Вопрос
  answer: { type: String, required: true },      // Ответ пользователя
  createdAt: { type: Date, default: Date.now },  // Время создания записи
});

export default mongoose.models.UserResponse || mongoose.model('UserResponse', userResponseSchema);