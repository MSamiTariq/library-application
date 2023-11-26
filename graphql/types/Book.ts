import { builder } from "../builder";

builder.prismaObject("Book", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    authorId: t.exposeInt("authorId"),
    studentId: t.exposeInt("studentId", { nullable: true }),
    author: t.relation("author"),
    issuedTo: t.relation("issuedTo"),
  }),
});

builder.queryField("books", (t) =>
  t.prismaField({
    type: ["Book"],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.book.findMany({ ...query }),
  })
);

builder.mutationField("createBook", (t) =>
  t.prismaField({
    type: "Book",
    args: {
      title: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      authorId: t.arg.int({ required: true }),
      studentId: t.arg.int({ required: false }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { title, description, authorId, studentId } = args;

      //   if (!(await ctx).user) {
      //     throw new Error("You have to be logged in to perform this action");
      //   }

      return prisma.book.create({
        ...query,
        data: {
          title,
          description,
          authorId,
          studentId,
        },
      });
    },
  })
);

builder.mutationField("deleteBook", (t) =>
  t.prismaField({
    type: "Book",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) =>
      prisma.book.delete({
        ...query,
        where: {
          id: Number(args.id),
        },
      }),
  })
);

builder.mutationField("updateBook", (t) =>
  t.prismaField({
    type: "Book",
    args: {
      id: t.arg.id({ required: true }),
      title: t.arg.string(),
      description: t.arg.string(),
      authorId: t.arg.int(),
      studentId: t.arg.int(),
    },
    resolve: async (query, _parent, args, _ctx) =>
      prisma.book.update({
        ...query,
        where: {
          id: Number(args.id),
        },
        data: {
          title: args.title ? args.title : undefined,
          studentId: args.studentId ? args.studentId : undefined,
          authorId: args.authorId ? args.authorId : undefined,
          description: args.description ? args.description : undefined,
        },
      }),
  })
);

builder.queryField("book", (t) =>
  t.prismaField({
    type: "Book",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, _parent, args, _info) =>
      prisma.book.findUnique({
        ...query,
        where: {
          id: Number(args.id),
        },
      }),
  })
);
