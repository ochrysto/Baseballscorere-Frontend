import { Routes } from '@angular/router';
import {LineUpComponent} from "./line-up/line-up.component";
import {BaseballScorerHomeComponent} from "./baseball-scorer-home/baseball-scorer-home.component";

export const routes: Routes = [
  {
    path: '', component: BaseballScorerHomeComponent
  },
  {
    path: 'test', component: LineUpComponent
  },
];
