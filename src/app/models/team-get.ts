import { LeagueGet } from './league-get';
import { ManagerGet } from './manager-get';
import { ClubGet } from './club-get';

export interface TeamGet {
  teamId: number;
  name: string;
  club: ClubGet;
  manager: ManagerGet;
  league: LeagueGet;
  teamLogo: string;
}
