import { Routes } from '@angular/router';
import { LineUpComponent } from './pages/line-up/line-up.component';
import { BaseballScorerHomeComponent } from './pages/baseball-scorer-home/baseball-scorer-home.component';
import { ProtectedRouteExampleComponent } from './components/protected-route-example/protected-route-example.component';
import { PublicRouteExampleComponent } from './components/public-route-example/public-route-example.component';
import { AuthGuard } from '../guard/auth.guard';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { ScorerAnlegenFormComponent } from './Components/scorer-anlegen-form/scorer-anlegen-form.component';
import {
  SchiedsrichterAnlegenFormComponent
} from './Components/schiedsrichter-anlegen-form/schiedsrichter-anlegen-form.component';
import { TeamErstellungsFormComponent } from './Components/team-erstellungs-form/team-erstellungs-form.component';
import {
  TeammitgliederHinzufuegenComponent
} from './Components/teammitglieder-hinzufuegen/teammitglieder-hinzufuegen.component';
import { GameCreate } from './components/game-create/game-create';
import { TeamSelectPageComponent } from './components/team-select-page/team-select-page.component';

export const routes: Routes = [
  {path: 'protected', component: ProtectedRouteExampleComponent, canActivate: [AuthGuard]},
  {path: 'public', component: PublicRouteExampleComponent},
  {path: '', component: BaseballScorerHomeComponent, canActivate: [AuthGuard]},
  {path: 'game/:id/line-up', component: LineUpComponent, canActivate: [AuthGuard]},
  {path: 'game/:id', component: GamePageComponent, canActivate: [AuthGuard]},
  {path: 'game', component: GameCreate, canActivate: [AuthGuard]},
  {path: 'scorer_anlegen', component: ScorerAnlegenFormComponent, canActivate: [AuthGuard]},
  {path: 'create-umpire', component: SchiedsrichterAnlegenFormComponent, canActivate: [AuthGuard]},
  {path: 'create-team', component: TeamErstellungsFormComponent, canActivate: [AuthGuard]},
  {path: 'edit-team', component: TeamSelectPageComponent, canActivate: [AuthGuard]},
  {path: 'edit-team/:id', component: TeammitgliederHinzufuegenComponent, canActivate: [AuthGuard]}, // Assuming :id is a unique identifier for a team
  {path: '', redirectTo: '/create-team', pathMatch: 'full'}
];
