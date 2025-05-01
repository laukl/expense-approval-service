import ExpenseClient from "../lib/expense-client";

const client = new ExpenseClient();

const args = process.argv.slice(2);

if (args.includes("--submitted")) {
  client.getSubmittedExpenses().then(console.log);
} else {
  client.getExpenses().then(console.log);
}
