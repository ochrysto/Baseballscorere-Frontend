import { Routes } from '@angular/router';
import {LineUpComponent} from "./pages/line-up/line-up.component";
import {BaseballScorerHomeComponent} from "./pages/baseball-scorer-home/baseball-scorer-home.component";
import {SpielAnlegenComponent} from "./spiel-anlegen/spiel-anlegen.component";
import { ProtectedRouteExampleComponent } from './components/protected-route-example/protected-route-example.component';
import { PublicRouteExampleComponent } from './components/public-route-example/public-route-example.component';
import { AuthGuard } from '../guard/auth.guard';
import { GamePageComponent } from "./pages/game-page/game-page.component";

export const routes: Routes = [
  { path: 'protected', component: ProtectedRouteExampleComponent, canActivate: [AuthGuard] },
  { path: 'public', component: PublicRouteExampleComponent },
  { path: '', component: BaseballScorerHomeComponent },
  { path: 'line-up', component: LineUpComponent },
  { path: 'game', component: GamePageComponent },
  { path: 'Anlegen', component: SpielAnlegenComponent },
];
