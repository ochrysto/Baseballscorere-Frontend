import { Routes } from '@angular/router';
import {ScorerAnlegenFormComponent} from "./Components/scorer-anlegen-form/scorer-anlegen-form.component";
import {
  SchiedsrichterAnlegenFormComponent
} from "./Components/schiedsrichter-anlegen-form/schiedsrichter-anlegen-form.component";

export const routes: Routes = [
  { path: 'scorer_anlegen', component: ScorerAnlegenFormComponent },
  { path: 'schiedsrichter_anlegen', component: SchiedsrichterAnlegenFormComponent }
];
