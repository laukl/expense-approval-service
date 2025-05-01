# Expense Approval Service

## Getting Started

Requirements:

- npm

### 1. Install dependencies

```bash
npm install
```

### 2. Build

```bash
npm run build
```

### 3. Run scripts

I've created some `npm` scripts to make running each part of the service easier.

It follows the following pattern:

```bash
npm run script:<name> -- <arg_1> <arg_2>
```

#### Create an expense

```bash
# Create an expense requiring a single approval
npm run script:create-expense

# Create an expense requiring 2 approvals, e.g. boss' boss scenario
npm run script:create-expense -- 2
```

#### Get expenses

A useful util to help you see what expenses are available to start a new approval flow with.

```bash
# See all expenses
npm run script:get-expenses

# See only expenses that are submitted to the approval flow
npm run script:get-expenses -- --submitted
```

#### Start an approval flow

```bash
# Start an approval flow for an expense, requires 2 args
npm run script:start-approval -- <expenseId> <userId>
```

#### See next approvers

This will show you who the next approvers are for an expense approval flow.

When the number of approvals from managers meets the required amount; then, the next approvers will be users who are in the Finance Team.

The Finance Team wil give the final approval for the expense.

```bash
npm run script:next-approvers -- <expenseId>

```

#### Seeing the current state of the flow

Use the debug script below to see information on the status of the flow, number of required reviewers (excluding Finance), the approvers, and non-approvers.

```bash
npm run script:dump-flow -- <expenseId>
```

#### Approving and rejecting expenses

```bash
# Approve an expense
npm run script:approve-expense -- <expenseId> <userId>

# Approve an expense
npm run script:reject-expense -- <expenseId> <userId>
```
