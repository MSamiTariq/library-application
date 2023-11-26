import prisma from "../lib/prisma";
export const resolvers = {
  Query: {
    books: () => {
      return prisma.book.findMany();
    },
  },
};
