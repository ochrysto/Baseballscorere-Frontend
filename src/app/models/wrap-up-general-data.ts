import { OfficialsGet } from './officials-get';

export interface WrapUpGeneralData {
  gameNr: string;
  date: string;
  duration: string;
  audience: string;
  location: string;
  innings: string;
  association: string;
  league: string;
  homeTeam: string;
  homeManager: string;
  guestTeam: string;
  guestManager: string;
  officials: OfficialsGet[];
  email: string;
}
