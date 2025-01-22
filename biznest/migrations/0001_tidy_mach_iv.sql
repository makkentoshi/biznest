ALTER TABLE "expenses" RENAME COLUMN "budgetId" TO "budgetid";--> statement-breakpoint
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_budgetId_budgets_id_fk";
--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_budgetid_budgets_id_fk" FOREIGN KEY ("budgetid") REFERENCES "public"."budgets"("id") ON DELETE no action ON UPDATE no action;