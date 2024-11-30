import { Game } from "../../../prisma/client";
import { RawgGameDetails as GameDetails, Platform, RawgGame } from "../rawg";

export type GameSearchResult = Game & {
  rawgData: Pick<RawgGame, "id" | "slug" | "name" | "released" | "background_image"> & {
    platforms: Platform[];
  };
};

export type CombinedGame = Game & {
  rawgData: RawgGame & GameDetails;
};
