// /graphql/types/User.ts
import { builder } from "../builder";

builder.prismaObject("Student", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    books: t.relation("books"),
  }),
});
  