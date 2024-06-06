import { ClubGet } from './club-get';
import { ManagerGet } from './manager-get';
import { LeagueGet } from './league-get';
import { PlayerGet } from './player-get';

export interface TeamWithPlayersGet {
  teamId: number;
  name: string;
  club: ClubGet;
  manager: ManagerGet;
  league: LeagueGet;
  teamLogo: string;
  playerList: PlayerGet[];
}
