# Example flow with script commands and output

### Create a new expense

```bash
npm run script:create-expense
```

```
[
  {
    id: 'cma5l0jxk0000oxexgzvgqs10',
    approvalsRequired: 1,
    finalApproval: false,
    submitterId: null,
    createdAt: 2025-05-01T16:31:02.121Z,
    updatedAt: 2025-05-01T16:31:02.121Z
  }
]
```

### Start an approval flow

```bash
npm run script:start-approval -- cma5l0jxk0000oxexgzvgqs10 cma52ov6y0007jmltn7wl1qp1
```

```
{
  id: 'cma5l0jxk0000oxexgzvgqs10',
  approvalsRequired: 1,
  finalApproval: false,
  submitterId: 'cma52ov6y0007jmltn7wl1qp1',
  createdAt: 2025-05-01T16:31:02.121Z,
  updatedAt: 2025-05-01T16:41:51.117Z
}
```

### See next approvers

```bash
npm run script:next-approvers -- cma5l0jxk0000oxexgzvgqs10
```

```
[
  {
    id: 'cma52ov6y0001jmltz9wpsrie',
    email: 'tom@tipalti.com',
    role: 'MANAGER',
    managerId: 'cma52ov6y0000jmltymeilpum',
    createdAt: 2025-05-01T16:30:05.045Z,
    updatedAt: 2025-05-01T16:30:05.045Z
  }
]
```

### Approve with Manager

```bash
npm run script:approve-expense -- cma5l0jxk0000oxexgzvgqs10 cma52ov6y0001jmltz9wpsrie
```

```
{
  id: 'cma5l0jxk0000oxexgzvgqs10',
  approvalsRequired: 1,
  finalApproval: false,
  submitterId: 'cma52ov6y0007jmltn7wl1qp1',
  createdAt: 2025-05-01T16:31:02.121Z,
  updatedAt: 2025-05-01T16:41:51.117Z,
  expenseApprovals: [
    {
      userId: 'cma52ov6y0001jmltz9wpsrie',
      expenseId: 'cma5l0jxk0000oxexgzvgqs10',
      createdAt: 2025-05-01T16:43:57.352Z
    }
  ]
}
```

### See next approvers

```bash
npm run script:next-approvers -- cma5l0jxk0000oxexgzvgqs10
```

```
[
  {
    id: 'cma52ov6y0008jmltpok252pl',
    email: 'michael-finance@tipalti.com',
    role: 'FINANCE',
    managerId: null,
    createdAt: 2025-05-01T16:30:05.045Z,
    updatedAt: 2025-05-01T16:30:05.045Z
  }
]
```

### Approve with Finance

```bash
npm run script:approve-expense -- cma5l0jxk0000oxexgzvgqs10 cma52ov6y0008jmltpok252pl
```

```
{
  id: 'cma5l0jxk0000oxexgzvgqs10',
  approvalsRequired: 1,
  finalApproval: false,
  submitterId: 'cma52ov6y0007jmltn7wl1qp1',
  createdAt: 2025-05-01T16:31:02.121Z,
  updatedAt: 2025-05-01T16:41:51.117Z,
  expenseApprovals: [
    {
      userId: 'cma52ov6y0001jmltz9wpsrie',
      expenseId: 'cma5l0jxk0000oxexgzvgqs10',
      createdAt: 2025-05-01T16:43:57.352Z
    },
    {
      userId: 'cma52ov6y0008jmltpok252pl',
      expenseId: 'cma5l0jxk0000oxexgzvgqs10',
      createdAt: 2025-05-01T16:44:57.723Z
    }
  ]
}
```

### See debug details

```bash
npm run script:dump-flow -- cma5l0jxk0000oxexgzvgqs10
```

```
----- Expense cma5l0jxk0000oxexgzvgqs10
Status: APPROVED
Number of approvers required before Finance: 1
Final approval (Finance Team): true
Created: 01/05/2025, 17:31:02
Updated: 01/05/2025, 17:44:57
----- Approvers
tom@tipalti.com at 01/05/2025, 17:43:57
michael-finance@tipalti.com at 01/05/2025, 17:44:57
----- Rejectors
-----
```
