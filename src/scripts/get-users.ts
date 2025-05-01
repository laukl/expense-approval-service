import ExpenseClient from "../lib/expense-client";

const client = new ExpenseClient();

client.getUsers().then(console.log);
