import { Expense, PrismaClient, User } from "@prisma/client";

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

  startApproval(expenseId: string, submitterId: string): Promise<Expense> {
    return this.prisma.expense.update({
      where: { id: expenseId },
      data: { submitterId },
    });
  }

  async nextApprovers(expenseId: string): Promise<User[]> {
    const expense = await this.prisma.expense.findUniqueOrThrow({
      where: { id: expenseId },
      include: { submitter: { include: { manager: true } } },
    });
    if (!expense.submitter?.managerId) {
      throw new Error("Submitter manager not found");
    }

    let nextManagerId = expense.submitter.managerId;
    const approverIds: string[] = [nextManagerId];
    for (let i = 1; i < expense.approvalsRequired; i++) {
      const manager = await this.prisma.user.findUniqueOrThrow({
        where: { id: nextManagerId },
      });
      if (!manager.managerId) throw new Error("Next manager not found");
      approverIds.push(manager.managerId);
    }

    return this.prisma.user.findMany({ where: { id: { in: approverIds } } });
  }

  async approve(
    expenseId: string,
    approverId: string,
  ): Promise<Expense | null> {
    const allowedApprovers = await this.nextApprovers(expenseId);
    if (!allowedApprovers.map((allowed) => allowed.id).includes(approverId)) {
      throw new Error(
        `This user is not allowed to approve expense ${expenseId}`,
      );
    }

    await this.prisma.expenseApproval.create({
      data: { expenseId, userId: approverId },
    });

    return this.prisma.expense.findUnique({
      where: { id: expenseId },
      include: { expenseApprovals: true },
    });
  }

  async reject(expenseId: string, rejectorId: string): Promise<Expense | null> {
    const allowedApprovers = await this.nextApprovers(expenseId);
    if (!allowedApprovers.map((allowed) => allowed.id).includes(rejectorId)) {
      throw new Error(
        `This user is not allowed to reject expense ${expenseId}`,
      );
    }

    await this.prisma.expenseRejection.create({
      data: { expenseId, userId: rejectorId },
    });

    return this.prisma.expense.findUnique({
      where: { id: expenseId },
      include: { expenseRejections: true },
    });
  }
}
