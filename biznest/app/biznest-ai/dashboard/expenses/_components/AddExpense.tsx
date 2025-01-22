"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetid, user, refreshData }) {
  const [name, setName] = useState(""); // Управление названием
  const [amount, setAmount] = useState(""); // Управление суммой
  const [loading, setLoading] = useState(false); // Состояние загрузки

  const addNewExpense = async () => {
    // Проверка введенных данных
    if (!name || !amount || isNaN(Number(amount))) {
      toast("Ошибка: убедитесь, что все поля заполнены корректно.");
      return;
    }

    setLoading(true);

    try {
      // Вставка новой траты в базу данных
      const result = await db
        .insert(Expenses)
        .values({
          name: name,
          amount: parseFloat(amount).toString(),
          budgetid: budgetid,
          createdat: moment().format("DD/MM/yyyy"),
        })
        .returning();

      if (result) {
        refreshData(); // Обновляем данные
        toast("Новые траты добавлены!");
        setName(""); // Очищаем поле названия
        setAmount(""); // Очищаем поле суммы
      }
    } catch (error) {
      console.error("Ошибка добавления:", error);
      toast("Не удалось добавить траты.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-5 rounded-2xl">
      <h2 className="font-bold text-lg">Добавить траты</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Название</h2>
        <Input
          placeholder="Например Спальный гарнитур"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Сумма ₸</h2>
        <Input
          placeholder="Например 10000₸"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={addNewExpense}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;