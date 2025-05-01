import ExpenseClient from "../lib/expense-client";

const client = new ExpenseClient();

client.createExpense().then(console.log);
