import { z } from "zod";
import ExpenseClient from "../lib/expense-client";

const client = new ExpenseClient();

const args = z
  .array(z.string())
  .refine((v) => v.length === 2, {
    message: "Make sure you're passing in 2 arguments [expenseId, approverId].",
  })
  .parse(process.argv.slice(2));

const [expenseId, approverId] = args;

client.approve(expenseId, approverId).then(console.log);
