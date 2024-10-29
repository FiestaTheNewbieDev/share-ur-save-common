import { User as PrismaUser, Game as PrismaGame } from "@prisma/client";

export { PrismaClient } from "@prisma/client";
export * as types from "./types";
export namespace prismaTypes {
    export type User = PrismaUser;
    export type Game = PrismaGame;
}
