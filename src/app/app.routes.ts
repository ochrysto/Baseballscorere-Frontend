import { Routes } from '@angular/router';
import {LineUpComponent} from "./pages/line-up/line-up.component";
import {BaseballScorerHomeComponent} from "./pages/baseball-scorer-home/baseball-scorer-home.component";
import {SpielAnlegenComponent} from "./spiel-anlegen/spiel-anlegen.component";
import { ProtectedRouteExampleComponent } from './components/protected-route-example/protected-route-example.component';
import { PublicRouteExampleComponent } from './components/public-route-example/public-route-example.component';
import { AuthGuard } from '../guard/auth.guard';
import { GamePageComponent } from "./pages/game-page/game-page.component";
import {ScorerAnlegenFormComponent} from "./Components/scorer-anlegen-form/scorer-anlegen-form.component";
import {
  SchiedsrichterAnlegenFormComponent
} from "./Components/schiedsrichter-anlegen-form/schiedsrichter-anlegen-form.component";
import {TeamErstellungsFormComponent} from "./Components/team-erstellungs-form/team-erstellungs-form.component";
import {
  TeammitgliederHinzufuegenComponent
} from "./Components/teammitglieder-hinzufuegen/teammitglieder-hinzufuegen.component";

export const routes: Routes = [
  { path: 'scorer_anlegen', component: ScorerAnlegenFormComponent },
  { path: 'schiedsrichter_anlegen', component: SchiedsrichterAnlegenFormComponent },
  { path: 'team_erstellen', component: TeamErstellungsFormComponent, canActivate: [AuthGuard]  },
  { path: 'TeamBearbeiten/:id', component: TeammitgliederHinzufuegenComponent, canActivate: [AuthGuard] }, // Assuming :id is a unique identifier for a team
    { path: 'protected', component: ProtectedRouteExampleComponent, canActivate: [AuthGuard] },
    { path: 'public', component: PublicRouteExampleComponent },
    { path: '', component: BaseballScorerHomeComponent },
    { path: 'line-up', component: LineUpComponent },
    { path: 'game', component: GamePageComponent },
    {
        path: 'test1', component: SpielAnlegenComponent
    },
];
