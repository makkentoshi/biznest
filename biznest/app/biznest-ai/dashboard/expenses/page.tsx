"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";

import ExpenseListTable from "@/app/biznest-ai/dashboard/expenses/_components/ExpenseListTable";

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getAllExpenses();
    }
  }, [user]);
  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdat,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetid))
      .where(eq(Budgets.createdby, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">Мои затраты</h2>

      <ExpenseListTable
        refreshData={() => getAllExpenses()}
        expensesList={expensesList}
      />
    </div>
  );
}

export default ExpensesScreen;
