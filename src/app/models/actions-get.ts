import { Actions } from './actions';
import { RunnerActions } from './runner-actions';

export interface ActionsGet {
  batter?: Actions | null;
  firstBaseRunner?: RunnerActions | null;
  secondBaseRunner?: RunnerActions | null;
  thirdBaseRunner?: RunnerActions | null;
}
