import { Responsible } from './responsible';

export interface ActionPost {
  base: number;
  type: string;
  distance: number;
  responsible: Responsible[];
}
