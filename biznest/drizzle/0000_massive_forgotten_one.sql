CREATE TABLE "budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"amount" numeric NOT NULL,
	"icon" varchar,
	"createdby" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"amount" numeric DEFAULT '0' NOT NULL,
	"budgetid" integer,
	"createdat" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "incomes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"amount" numeric NOT NULL,
	"icon" varchar,
	"createdby" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_budgetid_budgets_id_fk" FOREIGN KEY ("budgetid") REFERENCES "public"."budgets"("id") ON DELETE no action ON UPDATE no action;