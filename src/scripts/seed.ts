/** Seeds the SQLite database with users. */

import { PrismaClient, User } from "@prisma/client";

const USERS: Omit<User, "id" | "createdAt" | "updatedAt" | "managerId">[] = [
  {
    email: "jof@tipalti.com",
    role: "MANAGER",
  },
  {
    email: "tom@tipalti.com",
    role: "MANAGER",
  },
  {
    email: "nico@tipalti.com",
    role: "MANAGER",
  },
  {
    email: "ori@tipalti.com",
    role: "MANAGER",
  },
  {
    email: "igor@tipalti.com",
    role: "MANAGER",
  },
  {
    email: "sergey@approve.com",
    role: "MANAGER",
  },
  {
    email: "reut@approve.com",
    role: "MANAGER",
  },
  {
    email: "ben@approve.com",
    role: "MANAGER",
  },
  {
    email: "michael-finance@tipalti.com",
    role: "FINANCE",
  },
];

const prisma = new PrismaClient();

async function run() {
  const createResult = await prisma.user.createMany({ data: USERS });
  console.log(`Created: ${createResult.count}`);

  const users = await prisma.user.findMany({
    where: { role: "MANAGER", managerId: null },
  });
  const userIds = users.map((user) => user.id);

  return prisma.$transaction(
    users.map((user) => {
      const userIdsNotThisUser = userIds.filter((id) => id !== user.id);
      const managerId =
        userIdsNotThisUser[
          Math.floor(Math.random() * userIdsNotThisUser.length)
        ];
      return prisma.user.update({
        where: { id: user.id },
        data: { managerId },
      });
    }),
  );
}

run().then(console.log);
