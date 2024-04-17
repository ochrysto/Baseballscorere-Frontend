import { Routes } from '@angular/router';
import { ProtectedRouteExampleComponent } from './components/protected-route-example/protected-route-example.component';
import { PublicRouteExampleComponent } from './components/public-route-example/public-route-example.component';
import { LineUpComponent } from "./pages/line-up/line-up.component";
import { BaseballScorerHomeComponent } from "./pages/baseball-scorer-home/baseball-scorer-home.component";
import { AuthGuard } from '../guard/auth.guard';

export const routes: Routes = [
  { path: 'protected', component: ProtectedRouteExampleComponent, canActivate: [AuthGuard] },
  { path: 'public', component: PublicRouteExampleComponent },
  { path: '', component: BaseballScorerHomeComponent },
  { path: 'test', component: LineUpComponent },
];
