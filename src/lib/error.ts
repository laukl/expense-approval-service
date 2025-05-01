export class ExpenseError extends Error {
  constructor(expenseId: string, message: string) {
    super(`[${expenseId}] ${message}`);
    this.name = "ExpenseError";
    Object.setPrototypeOf(this, ExpenseError.prototype);
  }
}

export class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserError";
    Object.setPrototypeOf(this, UserError.prototype);
  }
}
