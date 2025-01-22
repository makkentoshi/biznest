import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";
import { toast } from "sonner";

interface Expense {
  id: string;
  name: string;
  amount: number;
  createdAt: string;
  budgetId: string;
}

interface ExpenseListTableProps {
  expensesList: Expense[];
  refreshData: () => void;
}



function ExpenseListTable({
  expensesList,
  refreshData,
}: ExpenseListTableProps) {
  // Отладка для проверки полученных данных
  useEffect(() => {
    console.log("Received expensesList:", expensesList);
  }, [expensesList]);

  const deleteExpense = async (expense: Expense) => {
    console.log("Attempting to delete expense:", expense);

    try {
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

      console.log("Delete result:", result);

      if (result.length > 0) {
        toast("Expense Deleted!");
        refreshData();
      } else {
        console.error("Failed to delete expense: No rows returned.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    }
  };

  

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Последние траты</h2>
      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Название</h2>
        <h2 className="font-bold">Потрачено</h2>
        <h2 className="font-bold">Дата</h2>
        <h2 className="font-bold">Действие</h2>
      </div>
      {expensesList.length > 0 ? (
        expensesList.map((expense) => (
          <div
            className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2"
            key={expense.id}
          >
            <h2>{expense.name}</h2>
            <h2>{expense.amount}₸</h2>
            <h2>{expense.createdAt}</h2>
            <h2
              onClick={() => deleteExpense(expense)}
              className="text-red-500 cursor-pointer"
            >
              Удалить
            </h2>
          </div>
        ))
      ) : (
        <div className="p-2 text-center text-gray-500">
          No expenses found. Debug: expensesList is empty or undefined.
        </div>
      )}
    </div>
  );
}

export default ExpenseListTable;
