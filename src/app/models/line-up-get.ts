import { LineUpPlayerGet } from './line-up-player-get';

export interface LineUpGet {
  teamId: number;
  playerList: LineUpPlayerGet[];
}
