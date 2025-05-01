/*
  Warnings:

  - The primary key for the `ExpenseApproval` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ExpenseApproval` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ExpenseApproval` table. All the data in the column will be lost.
  - The primary key for the `ExpenseRejection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ExpenseRejection` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ExpenseRejection` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExpenseApproval" (
    "userId" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("expenseId", "userId"),
    CONSTRAINT "ExpenseApproval_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ExpenseApproval_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExpenseApproval" ("createdAt", "expenseId", "userId") SELECT "createdAt", "expenseId", "userId" FROM "ExpenseApproval";
DROP TABLE "ExpenseApproval";
ALTER TABLE "new_ExpenseApproval" RENAME TO "ExpenseApproval";
CREATE TABLE "new_ExpenseRejection" (
    "userId" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("expenseId", "userId"),
    CONSTRAINT "ExpenseRejection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ExpenseRejection_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExpenseRejection" ("createdAt", "expenseId", "userId") SELECT "createdAt", "expenseId", "userId" FROM "ExpenseRejection";
DROP TABLE "ExpenseRejection";
ALTER TABLE "new_ExpenseRejection" RENAME TO "ExpenseRejection";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
