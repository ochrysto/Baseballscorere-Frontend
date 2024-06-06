import {Routes} from '@angular/router';
import {AuthGuard} from '../guard/auth.guard';
import {GameCreate} from './components/game-create/game-create';
import {LineUpComponent} from './pages/line-up/line-up.component';
import {GamePageComponent} from './pages/game-page/game-page.component';
import {BaseballScorerHomeComponent} from './pages/baseball-scorer-home/baseball-scorer-home.component';
import {TeamSelectPageComponent} from './components/team-select-page/team-select-page.component';
import {ScorerCreateFormComponent} from './components/scorer-anlegen-form/scorer-create-form.component';
import {PublicRouteExampleComponent} from './components/public-route-example/public-route-example.component';
import {TeamCreateFormComponent} from './components/team-create-form/team-create-form.component';
import {ProtectedRouteExampleComponent} from './components/protected-route-example/protected-route-example.component';
import {TeamPlayerAddComponent} from './components/team-player-add/team-player-add.component';
import {UmpireCreateFormComponent} from './components/umpire-create-form/umpire-create-form.component';

export const routes: Routes = [
  {path: 'protected', component: ProtectedRouteExampleComponent, canActivate: [AuthGuard]},
  {path: 'public', component: PublicRouteExampleComponent},
  {path: '', component: BaseballScorerHomeComponent, canActivate: [AuthGuard]},
  {path: 'game/:id/line-up', component: LineUpComponent, canActivate: [AuthGuard]},
  {path: 'game/:id', component: GamePageComponent, canActivate: [AuthGuard]},
  {path: 'game', component: GameCreate, canActivate: [AuthGuard]},
  {path: 'create-scorer', component: ScorerCreateFormComponent, canActivate: [AuthGuard]},
  {path: 'create-umpire', component: UmpireCreateFormComponent, canActivate: [AuthGuard]},
  {path: 'create-team', component: TeamCreateFormComponent, canActivate: [AuthGuard]},
  {path: 'edit-team', component: TeamSelectPageComponent, canActivate: [AuthGuard]},
  {path: 'edit-team/:id', component: TeamPlayerAddComponent, canActivate: [AuthGuard]}, // Assuming :id is a unique identifier for a team
  {path: '', redirectTo: '/create-team', pathMatch: 'full'}
];
