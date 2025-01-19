import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },                     // Название расхода
  amount: { type: Number, required: true, default: 0 },       // Сумма расхода
  budgetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget' },  // Ссылка на бюджет
  createdBy: { type: String, required: true },                // Email пользователя, создавшего расход
  createdAt: { type: Date, default: Date.now },               // Время создания
});

// Экспорт модели Expense
export default mongoose.models.Expense || mongoose.model('Expense', expenseSchema);