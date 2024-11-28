import { Game } from "../../../prisma/client";
import { RawgGameDetails as GameDetails, RawgGame } from "../rawg";

export type GameSearchResult = Game & {
  rawgData: RawgGame;
};

export type CombinedGame = Game & {
  rawgData: RawgGame & GameDetails;
};
