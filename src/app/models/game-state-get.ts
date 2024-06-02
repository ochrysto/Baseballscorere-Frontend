import { LineupPlayerGet } from './lineup-player-get';
import {ScoreboardInningGet} from "./scoreboard-inning-get";

export interface GameStateGet {
  game: number;
  awayRunsTotal: number;
  homeRunsTotal: number;
  awayErrors: number;
  homeErrors: number;
  awayHits: number;
  homeHits: number;
  awayLob: number;
  homeLob: number;
  //awayRuns: number[];
  //homeRuns: number[];
  scoreBoardInnings: ScoreboardInningGet[]
  inning: number;
  team: string;
  outs: number;
  balls: number;
  strikes: number;
  onDeck: LineupPlayerGet | null;
  batter: LineupPlayerGet | null;
  firstBase: LineupPlayerGet | null;
  secondBase: LineupPlayerGet | null;
  thirdBase: LineupPlayerGet | null;
}
