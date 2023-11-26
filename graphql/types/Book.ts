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
