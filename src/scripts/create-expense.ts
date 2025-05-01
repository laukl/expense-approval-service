import { z } from "zod";
import ExpenseClient from "../lib/expense-client";

const client = new ExpenseClient();

const approvalsRequired = z
  .number({ coerce: true })
  .optional()
  .parse(process.argv.at(2));

client.createExpense(approvalsRequired).then(console.log);
