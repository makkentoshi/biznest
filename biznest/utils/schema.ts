import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
  boolean
} from "drizzle-orm/pg-core";


export const Budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull(),
  icon: varchar("icon"),
  createdby: varchar("createdby").notNull(), // Колонка createdBy
});

export const Expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull().default("0"),
  budgetid: integer("budgetid").references(() => Budgets.id), // Используем budgetid
  createdat: varchar("createdat").notNull(),
});

export const Incomes = pgTable("incomes", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull(),
  icon: varchar("icon"),
  createdby: varchar("createdby").notNull(),
});

export const Bots = pgTable("bots", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 256 }).notNull(), // Просто строка без связи с users
  botToken: varchar("bot_token", { length: 256 }).notNull(),
  prompt: varchar("prompt", { length: 4096 }).default("Вы - полезный ассистент."),
  triggerWords: varchar("trigger_words", { length: 256 }).array().default([]),
  isAIEnabled: boolean("is_ai_enabled").default(true),
});