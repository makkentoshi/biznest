import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Название дохода
  amount: { type: String, required: true },      // Сумма дохода
  icon: { type: String },                        // Иконка (опционально)
  createdBy: { type: String, required: true },   // Email пользователя, создавшего доход
  createdAt: { type: Date, default: Date.now },  // Время создания
});

// Экспорт модели Income
export default mongoose.models.Income || mongoose.model('Income', incomeSchema);