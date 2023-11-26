// /graphql/types/User.ts
import { builder } from "../builder";

builder.prismaObject("Author", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    books: t.relation("books"),
  }),
});
