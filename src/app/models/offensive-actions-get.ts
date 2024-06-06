import { DiamondGet } from './diamond-get';

export interface OffensiveActionsGet {
  firstName: string;
  lastName: string;
  jerseyNr: number;
  isAtBat: boolean;
  diamond: DiamondGet;
}
