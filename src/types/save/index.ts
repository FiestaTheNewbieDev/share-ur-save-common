import { Save, SaveUpvote, User } from "../../../prisma/client";

export type AggregatedSave = Save & {
  author: Pick<User, "uuid" | "username" | "displayName">;
  score: number;
  customerVote?: SaveUpvote;
};

export type SavesTab =
  | "new-today"
  | "new-this-week"
  | "new-this-month"
  | "latest"
  | "popular";
