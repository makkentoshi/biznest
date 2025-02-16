"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Bots } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateBot({ refreshData }) {
  const [botName, setBotName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [triggerWords, setTriggerWords] = useState("");
  const [botToken, setBotToken] = useState("");

  const { user } = useUser();

  /**
   * Used to Create New Telegram Bot
   */
  const onCreateBot = async () => {
    if (!botName || !botToken) {
      toast("Please enter all fields!");
      return;
    }
  
    try {
      const result = await db
        .insert(Bots)
        .values({
          userId: user?.primaryEmailAddress?.emailAddress ?? "Unknown", // Исправлено!
          botToken: botToken,  // Исправлено!
          prompt: prompt || "Вы - полезный ассистент.", // Значение по умолчанию
          triggerWords: Array.isArray(triggerWords) ? triggerWords : [], // Гарантия массива
          isAIEnabled: true, // По умолчанию true
        })
        .returning({ insertedId: Bots.id });
  
      if (result) {
        refreshData();
        toast("New Telegram Bot Created!");
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      toast("Failed to create bot!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Bot</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Telegram Bot</DialogTitle>
          <DialogDescription>
            Set up the bot name, prompt, trigger words, and API token.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Bot Name"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
          />
          <Input
            placeholder="Bot Token"
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
          />
          <Input
            placeholder="Trigger Words (comma separated)"
            value={triggerWords}
            onChange={(e) => setTriggerWords(e.target.value)}
          />
          <Input
            placeholder="Prompt (e.g., 'Act as a store support bot')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onCreateBot}>Create</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBot;