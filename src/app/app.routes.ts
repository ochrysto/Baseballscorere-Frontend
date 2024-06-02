import {Routes} from '@angular/router';
import {LineUpComponent} from "./pages/line-up/line-up.component";
import {BaseballScorerHomeComponent} from "./pages/baseball-scorer-home/baseball-scorer-home.component";
import {ProtectedRouteExampleComponent} from './components/protected-route-example/protected-route-example.component';
import {PublicRouteExampleComponent} from './components/public-route-example/public-route-example.component';
import {AuthGuard} from '../guard/auth.guard';
import {GamePageComponent} from "./pages/game-page/game-page.component";
import {ScorerAnlegenFormComponent} from "./Components/scorer-anlegen-form/scorer-anlegen-form.component";
import {
  SchiedsrichterAnlegenFormComponent
} from "./Components/schiedsrichter-anlegen-form/schiedsrichter-anlegen-form.component";
import {TeamErstellungsFormComponent} from "./Components/team-erstellungs-form/team-erstellungs-form.component";
import {
  TeammitgliederHinzufuegenComponent
} from "./Components/teammitglieder-hinzufuegen/teammitglieder-hinzufuegen.component";
import {GameCreate} from "./components/game-create/game-create";

export const routes: Routes = [
  {path: 'protected', component: ProtectedRouteExampleComponent, canActivate: [AuthGuard]},
  {path: 'public', component: PublicRouteExampleComponent},
  {path: '', component: BaseballScorerHomeComponent},
  {path: 'game/:id/line-up', component: LineUpComponent, canActivate: [AuthGuard]},
  {path: 'game/:id', component: GamePageComponent, canActivate: [AuthGuard]},
  {path: 'game', component: GameCreate, canActivate: [AuthGuard]},
  {path: 'scorer_anlegen', component: ScorerAnlegenFormComponent},
  {path: 'schiedsrichter_anlegen', component: SchiedsrichterAnlegenFormComponent},
  {path: 'team_erstellen', component: TeamErstellungsFormComponent},
  {path: 'TeamBearbeiten/:id', component: TeammitgliederHinzufuegenComponent}, // Assuming :id is a unique identifier for a team
  {path: '', redirectTo: '/team_erstellen', pathMatch: 'full'}
];
