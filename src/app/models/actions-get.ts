import { Actions } from './actions';
import { RunnerActions } from './runner-actions';

export interface ActionsGet {
  batter?: Actions | null;
  first_base_runner?: RunnerActions | null;
  second_base_runner?: RunnerActions | null;
  third_base_runner?: RunnerActions | null;
}
