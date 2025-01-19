import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Название бюджета
  amount: { type: String, required: true },      // Сумма бюджета
  icon: { type: String },                        // Иконка (опционально)
  createdBy: { type: String, required: true },   // Email пользователя, создавшего бюджет
  createdAt: { type: Date, default: Date.now },  // Время создания
});


export default mongoose.models.Budget || mongoose.model('Budget', budgetSchema);