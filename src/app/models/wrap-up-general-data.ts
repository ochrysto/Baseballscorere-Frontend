import { OfficialsGet } from './officials-get';

export interface WrapUpGeneralData {
  gameNr: string;
  date: string;
  beginning: string;
  end: string;
  duration: number;
  audience: string;
  location: string;
  innings: string;
  association: string;
  league: string;
  homeTeam: string;
  homeTeamLogo: string;
  homeManager: string;
  guestTeam: string;
  guestTeamLogo: string;
  guestManager: string;
  officials: OfficialsGet[];
  email: string;
}
