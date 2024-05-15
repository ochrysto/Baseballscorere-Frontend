import { Routes } from '@angular/router';
import {LineUpComponent} from "./line-up/line-up.component";
import {BaseballScorerHomeComponent} from "./baseball-scorer-home/baseball-scorer-home.component";
import {SpielAnlegenComponent} from "./spiel-anlegen/spiel-anlegen.component";

export const routes: Routes = [
  {
    path: '', component: BaseballScorerHomeComponent
  },
  {
    path: 'test', component: LineUpComponent
  },
  {
    path: 'test1', component: SpielAnlegenComponent
  },
];
