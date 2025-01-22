"use client";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { EditBudgetProps } from "@/lib/types";
// import { useUser } from "@clerk/nextjs";

function EditBudget({ budgetInfo, refreshData }: EditBudgetProps) {
  const [emojiIcon, setEmojiIcon] = useState<string>(budgetInfo?.icon || "");
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const [name, setName] = useState<string>(budgetInfo?.name || "");
  const [amount, setAmount] = useState<string>(budgetInfo?.amount || "");

//   const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo.icon);
      setName(budgetInfo.name);
      setAmount(budgetInfo.amount);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    try {
      const result = await db
        .update(Budgets)
        .set({
          name: name,
          amount: amount,
          icon: emojiIcon,
        })
        .where(eq(Budgets.id, budgetInfo.id))
        .returning();

      if (result) {
        refreshData();
        toast("Бюджет обновлён!");
      }
    } catch (error) {
      console.error("Error updating budget:", error);
      toast("Failed to update budget.");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex space-x-2 gap-2 rounded-full">
            <PenBox className="w-4" /> Редактировать
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Обновить бюджет</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Название бюджета</h2>
                  <Input
                    placeholder="Например Спальный гарнитур"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Сумма в ₸</h2>
                  <Input
                    type="number"
                    value={amount}
                    placeholder="Например 5000₸"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={onUpdateBudget}
                className="mt-5 w-full rounded-full"
              >
                Обновить бюджет
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
