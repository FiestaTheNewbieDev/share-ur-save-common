import { Game } from '../../../prisma/client';
import { RawgGameDetails as GameDetails, RawgGame } from '../rawg';

export type CombinedGame = Game & {
  rawgData: RawgGame & GameDetails;
};
