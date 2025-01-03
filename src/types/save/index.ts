import { Save, User } from "../../../prisma/client";

export type AggregatedSave = Save & {
  author: Pick<User, "uuid" | "username" | "displayName">;
};

export type SavesTab =
  | "new-today"
  | "new-this-week"
  | "new-this-month"
  | "latest"
  | "popular";
