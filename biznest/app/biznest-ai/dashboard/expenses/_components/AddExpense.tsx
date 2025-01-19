import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";
import { AddExpenseProps } from "@/lib/types";

function AddExpense({ budgetId, user, refreshData }: AddExpenseProps) {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const addNewExpense = async () => {
    setLoading(true);

    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name, // строка (соответствует схеме)
          amount: parseFloat(amount).toString(), // преобразуем в строку
          budgetId: budgetId, // число (соответствует схеме)
          createdAt: moment().format("DD/MM/yyyy"), // строка (соответствует схеме)
        })
        .returning();

      if (result) {
        setAmount("");
        setName("");
        refreshData();
        toast("New Expense Added!");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast("Failed to add expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-5 rounded-2xl">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
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
