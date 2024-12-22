import { Save, User } from "prisma/client";


export type AggregatedSave = Save & {
    author: Pick<User, 'uuid' | 'username' | 'displayName'>;
}