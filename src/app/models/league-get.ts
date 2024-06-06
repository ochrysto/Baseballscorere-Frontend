import {AssociationGet} from "./association-get";

export interface LeagueGet {
  id: number;
  name: string;
  association: AssociationGet;
}
