import { LineUpPlayerGet } from './line-up-player-get';

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
  awayRuns: number[];
  homeRuns: number[];
  inning: number;
  team: string;
  outs: number;
  balls: number;
  strikes: number;
  onDeck: LineUpPlayerGet | null;
  batter: LineUpPlayerGet | null;
  firstBase: LineUpPlayerGet | null;
  secondBase: LineUpPlayerGet | null;
  thirdBase: LineUpPlayerGet | null;
}
