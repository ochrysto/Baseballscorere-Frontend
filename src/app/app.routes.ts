import { Routes } from '@angular/router';
import { ProtectedRouteExampleComponent } from './components/protected-route-example/protected-route-example.component';
import { PublicRouteExampleComponent } from './components/public-route-example/public-route-example.component';
import { AuthGuard } from '../guard/auth.guard';

export const routes: Routes = [
  { path: 'protected', component: ProtectedRouteExampleComponent, canActivate: [AuthGuard] },
  { path: 'public', component: PublicRouteExampleComponent},
];
