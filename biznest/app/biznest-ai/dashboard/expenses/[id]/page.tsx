"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import BudgetItem from "@/app/biznest-ai/dashboard/budgets/_components/BudgetItem";
import AddExpense from "@/app/biznest-ai/dashboard/expenses/_components/AddExpense";
import ExpenseListTable from "@/app/biznest-ai/dashboard/expenses/_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import EditBudget from "@/app/biznest-ai/dashboard/expenses/_components/EditBudget";

function ExpensesScreen() {
  const { id } = useParams(); // Получаем ID из параметров маршрута
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState<any>();
  const [expensesList, setExpensesList] = useState([]);
  const route = useRouter();

  useEffect(() => {
    if (user && id) {
      getBudgetInfo();
    }
  }, [user, id]);

  const getBudgetInfo = async () => {
    if (!id || isNaN(Number(id))) {
      console.error("ID бюджета отсутствует или некорректен!");
      return;
    }

    const createdBy = user?.primaryEmailAddress?.emailAddress;
    if (!createdBy) {
      console.error("Email пользователя не найден!");
      return;
    }

    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetid))
        .where(eq(Budgets.createdby, createdBy))
        .where(eq(Budgets.id, Number(id)))
        .groupBy(Budgets.id);

      if (result.length > 0) {
        setBudgetInfo(result[0]);
        getExpensesList();
      } else {
        console.error("Не найден бюджет с указанным ID.");
      }
    } catch (error) {
      console.error("Ошибка при получении информации о бюджете:", error);
    }
  };

  const getExpensesList = async () => {
    if (!id || isNaN(Number(id))) {
      console.error("ID бюджета отсутствует или некорректен для получения расходов!");
      return;
    }

    try {
      const result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetid, Number(id)))
        .orderBy(desc(Expenses.id));

      setExpensesList(result);
    } catch (error) {
      console.error("Ошибка при получении списка расходов:", error);
    }
  };

  const deleteBudget = async () => {
    if (!id || isNaN(Number(id))) {
      console.error("ID бюджета отсутствует или некорректен для удаления!");
      return;
    }

    try {
      const deleteExpenseResult = await db
        .delete(Expenses)
        .where(eq(Expenses.budgetid, Number(id)))
        .returning();

      if (deleteExpenseResult) {
        await db.delete(Budgets).where(eq(Budgets.id, Number(id))).returning();
        toast("Бюджет удалён!");
        route.replace("/biznest-ai/dashboard/budgets");
      } else {
        toast("Не удалось удалить расходы.");
      }
    } catch (error) {
      console.error("Ошибка при удалении бюджета:", error);
      toast("Не удалось удалить бюджет.");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => route.back()} className="cursor-pointer" />
          Мои расходы
        </span>
        <div className="flex gap-2 items-center">
          {budgetInfo && (
            <EditBudget
              budgetInfo={budgetInfo}
              refreshData={() => getBudgetInfo()}
            />
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 rounded-full" variant="destructive">
                <Trash className="w-4" /> Удалить
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие нельзя отменить. Это навсегда удалит текущий
                  бюджет вместе с расходами и удалит ваши данные с наших
                  серверов.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={deleteBudget}>
                  Продолжить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        {user && (
          <AddExpense
            budgetid={Number(id)} // Передаем budgetid как число
            user={user}
            refreshData={() => getBudgetInfo()}
          />
        )}
      </div>
      <div className="mt-4">
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;