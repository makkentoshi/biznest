"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import { Expense } from "@/lib/types";

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState<Expense[]>([]);
  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);
  /**
   * used to get budget List
   */
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),

        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetid))
      .where(eq(Budgets.createdby, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
    getAllExpenses();
    getIncomeList();
  };

  /**
   * Get Income stream list
   */
  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
          totalAmount: sql`SUM(${Incomes.amount})`.mapWith(Number), // Убираем CAST, если amount уже NUMERIC
        })
        .from(Incomes)
        .groupBy(Incomes.id);

      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      return;
    }

    const result = await db
      .select({
        id: Expenses.id, // Указываем таблицу для каждой колонки
        name: Expenses.name,
        amount: Expenses.amount,
        createdat: Expenses.createdat,
      })
      .from(Expenses)
      .leftJoin(Budgets, eq(Budgets.id, Expenses.budgetid))
      .where(eq(Budgets.createdby, user.primaryEmailAddress.emailAddress))
      // .where(eq(Expenses.budgetid, Number(id))) // Используем id из use(params)
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  };

  return (
    <div className="p-8 bg-  ">
      <h2 className="font-bold text-4xl">Салем, {user?.fullName} 👋</h2>
      <p className="text-gray-500">
        Вот что происходит с вашими деньгами, управление расходами
      </p>

      <CardInfo budgetList={budgetList} incomeList={incomeList} />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <BarChartDashboard budgetList={budgetList} />

          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Последние Бюджеты</h2>
          {budgetList?.length > 0
            ? budgetList.map((budget, index) => (
                <BudgetItem budget={budget} key={index} />
              ))
            : [1, 2, 3, 4].map((item, index) => (
                <div
                  key={index}
                  className="h-[180xp] w-full
                 bg-slate-200 rounded-lg animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
