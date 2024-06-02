import {Diamonds} from "./diamonds";

export interface OffensiveActionsGet {
  name: string;
  passNumber: number;
  offensiveActions: Diamonds[];
}
