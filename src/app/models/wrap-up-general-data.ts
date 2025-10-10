import { UmpireGet } from './umpire-get';
import { ScorerGet } from './scorer-get';

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
  umpire: UmpireGet[];
  scorer: ScorerGet;
  email: string;
}
