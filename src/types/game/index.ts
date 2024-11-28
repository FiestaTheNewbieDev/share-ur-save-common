import { Game } from "../../../prisma/client";
import { RawgGameDetails as GameDetails, RawgGame } from "../rawg";

export type GameSearchResult = Game & {
  rawgData: Pick<RawgGame, "id" | "slug" | "name" | "released" | "background_image">;
};

export type CombinedGame = Game & {
  rawgData: RawgGame & GameDetails;
};
