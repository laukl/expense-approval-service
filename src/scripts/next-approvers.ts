import { z } from "zod";
import ExpenseClient from "../lib/expense-client";

const client = new ExpenseClient();

const expenseId = z
  .string({ message: "Must provide expenseId argument." })
  .parse(process.argv.at(2));

client.nextApprovers(expenseId).then(console.log);
