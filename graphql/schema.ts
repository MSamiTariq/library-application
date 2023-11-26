import { builder } from "./builder";
import "./types/Student";
import "./types/Author";
import "./types/Book";

export const schema = builder.toSchema();
