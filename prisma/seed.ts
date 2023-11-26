// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import { books } from "../data/books";
const prisma = new PrismaClient();

async function main() {
  await prisma.student.createMany({
    data: [
      {
        name: "Sam",
      },
      {
        name: "Dam",
      },
      {
        name: "Latham",
      },
      {
        name: "Josh",
      },
    ],
  });

  await prisma.author.createMany({
    data: [
      {
        name: "Tom",
      },
      {
        name: "Jim",
      },
      {
        name: "Curran",
      },
      {
        name: "Justin",
      },
    ],
  });

  await prisma.book.createMany({
    data: books,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
