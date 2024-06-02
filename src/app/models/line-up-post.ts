import {LineUpPlayerPost} from "./line-up-player-post";

export interface LineUpPost {
  teamId: number;
  gameId: number;
  playerList: LineUpPlayerPost[];
}
