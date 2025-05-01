import { Expense, PrismaClient } from "@prisma/client";

export default class ExpenseClient {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  createExpense(approvalsRequired?: number): Promise<Expense> {
    return this.prisma.expense.create({ data: { approvalsRequired } });
  }

  getExpenses(): Promise<Expense[]> {
    return this.prisma.expense.findMany();
  }

  getSubmittedExpenses(): Promise<Expense[]> {
    return this.prisma.expense.findMany({
      where: { submitterId: { not: null } },
    });
  }
}
