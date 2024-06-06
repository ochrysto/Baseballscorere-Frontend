import {UmpireGet} from "./umpire-get";
import {ScorerGet} from "./scorer-get";
import {TeamWithPlayersGet} from "./team-with-players-get";
import {LeagueGet} from "./league-get";
import {AssociationGet} from "./association-get";

export interface GameGet {
  id: number;
  gameNr: number;
  date: string;
  location: string;
  innings: number;
  association: AssociationGet;
  league: LeagueGet;
  hostTeam: TeamWithPlayersGet;
  guestTeam: TeamWithPlayersGet;
  umpireList: UmpireGet[];
  scorer: ScorerGet;
}
