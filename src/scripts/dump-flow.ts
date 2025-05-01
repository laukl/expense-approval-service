import { z } from "zod";
import ExpenseClient from "../lib/expense-client";

const client = new ExpenseClient();

const expenseId = z.string().parse(process.argv.at(2));

client.dumpFlow(expenseId);
