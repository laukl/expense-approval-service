# 2. expense client pattern

Date: 2025-05-01

## Status

Accepted

## Context

### Scope

An expense is submitted by an employee. It then typically needs approval by several people, in a specific order, something we call the approval flow.

Our various clients have different approval flows but most use the simple two-step pattern:

1. Expense is approved by the submitter's boss
2. Expense is approved by someone from the finance team

In addition, some clients require an additional step for expenses above a certain threshold. In that case the approval flow will become:

1. Expense is approved by the submitter's boss
2. Expense is approved by the submitter's boss' boss
3. Expense is approved by someone from the finance team

We also plan to allow further approval flow options to our clients in the future.

## Decision

PrismaORM with SQLite will be used to persist the data, please see the [Logical ERD](../erd.md) for more detail.

With regards to the data model, `Expense` will have relations with `ExpenseApproval` and `ExpenseRejection`. The reason for this is so that we can at a mininum see when approvals and rejections were actioned. Furthermore, this allows for more flexibility in the future to extend this feature, e.g. adding comments/reasons to rejections.

`Expense` has an `approvalsRequired` which is an integer that determines how many approvals from managers are required before the Finance Team can approve it. This `approvalsRequired` can be set when creating a new expense.

`User` behaves like a linked-list with employee-manager relationships. When the `managerId` is `null`, it means there's no manager above that current user — potentially being C-suite or Directors.

## Limitations

There were many cases to consider, and due to time limit, here are some that I've noted with suggestions for improvements:

**No API, just an exported class**

The exported class is portable, we can integrate this as part of any frameworks like Nest.js, Express.js, etc.

**After an `approve` or `reject`, unless being in the Finance Team, you can't change an approval or rejection for that user**

Add in additional logic to check for if the user has an existing approval/rejection tied to tha expense, if so, add them to the return of `nextApprovers` or equivalent — allowing them to change their decision.

**Not enough managers**

If the database only contains at most 2 tiers of managers, e.g. your boss' boss, and if you create an expense with `approvalsRequired` being more than `2`, there will not be enough managers to complete the flow.

New logic can be added to validate this during expense creation or when starting an approval flow. If there's not enough managers, the interface can throw an error.
