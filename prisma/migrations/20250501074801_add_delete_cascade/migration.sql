-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "approvalsRequired" INTEGER NOT NULL DEFAULT 1,
    "finalApproval" BOOLEAN NOT NULL DEFAULT false,
    "submitterId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Expense_submitterId_fkey" FOREIGN KEY ("submitterId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Expense" ("approvalsRequired", "createdAt", "finalApproval", "id", "submitterId", "updatedAt") SELECT "approvalsRequired", "createdAt", "finalApproval", "id", "submitterId", "updatedAt" FROM "Expense";
DROP TABLE "Expense";
ALTER TABLE "new_Expense" RENAME TO "Expense";
CREATE UNIQUE INDEX "Expense_id_key" ON "Expense"("id");
CREATE TABLE "new_ExpenseApproval" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExpenseApproval_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ExpenseApproval_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExpenseApproval" ("createdAt", "expenseId", "id", "updatedAt", "userId") SELECT "createdAt", "expenseId", "id", "updatedAt", "userId" FROM "ExpenseApproval";
DROP TABLE "ExpenseApproval";
ALTER TABLE "new_ExpenseApproval" RENAME TO "ExpenseApproval";
CREATE UNIQUE INDEX "ExpenseApproval_id_key" ON "ExpenseApproval"("id");
CREATE TABLE "new_ExpenseRejection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExpenseRejection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ExpenseRejection_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExpenseRejection" ("createdAt", "expenseId", "id", "updatedAt", "userId") SELECT "createdAt", "expenseId", "id", "updatedAt", "userId" FROM "ExpenseRejection";
DROP TABLE "ExpenseRejection";
ALTER TABLE "new_ExpenseRejection" RENAME TO "ExpenseRejection";
CREATE UNIQUE INDEX "ExpenseRejection_id_key" ON "ExpenseRejection"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
