import { Game } from '@prisma/client';
import { GameDetails, Game as RawgGame } from '../rawg';

export type CombinedGame = Game & {
  rawgData: RawgGame & GameDetails;
};
