/** Seeds the SQLite database with users. */

import { PrismaClient, User } from "@prisma/client";

const USERS: Omit<User, "createdAt" | "updatedAt">[] = [
  {
    id: "cma52ov6y0000jmltymeilpum",
    email: "jof@tipalti.com",
    role: "MANAGER",
    managerId: null,
  },
  {
    id: "cma52ov6y0001jmltz9wpsrie",
    email: "tom@tipalti.com",
    role: "MANAGER",
    managerId: "cma52ov6y0000jmltymeilpum",
  },
  {
    id: "cma52ov6y0002jmltz63w23sz",
    email: "nico@tipalti.com",
    role: "MANAGER",
    managerId: "cma52ov6y0000jmltymeilpum",
  },
  {
    id: "cma52ov6y0003jmlt0e729uyf",
    email: "ori@tipalti.com",
    role: "MANAGER",
    managerId: "cma52ov6y0000jmltymeilpum",
  },
  {
    id: "cma52ov6y0004jmltdj1zd4z3",
    email: "igor@tipalti.com",
    role: "MANAGER",
    managerId: "cma52ov6y0000jmltymeilpum",
  },
  {
    id: "cma52ov6y0005jmlt69tgezh4",
    email: "sergey@approve.com",
    role: "MANAGER",
    managerId: "cma52ov6y0001jmltz9wpsrie",
  },
  {
    id: "cma52ov6y0006jmltun1kleco",
    email: "reut@approve.com",
    role: "MANAGER",
    managerId: "cma52ov6y0001jmltz9wpsrie",
  },
  {
    id: "cma52ov6y0007jmltn7wl1qp1",
    email: "ben@approve.com",
    role: "MANAGER",
    managerId: "cma52ov6y0001jmltz9wpsrie",
  },
  {
    id: "cma52ov6y0008jmltpok252pl",
    email: "michael-finance@tipalti.com",
    role: "FINANCE",
    managerId: null,
  },
];

const prisma = new PrismaClient();

prisma
  .$transaction(
    USERS.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        create: user,
        update: user,
      }),
    ),
  )
  .then(console.log);
