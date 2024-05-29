import { Actions } from './actions';

export interface RunnerActions {
  first_base?: Actions | null;
  second_base?: Actions | null;
  third_base?: Actions | null;
  home_base?: Actions | null;
}
