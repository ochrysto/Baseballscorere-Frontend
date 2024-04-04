import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseballScorerHomeComponent } from './baseball-scorer-home/baseball-scorer-home.component';

const routes: Routes = [
  { path: '', component: BaseballScorerHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
