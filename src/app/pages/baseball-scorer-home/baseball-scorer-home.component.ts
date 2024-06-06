import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-baseball-scorer-home',
  standalone: true,
  imports: [RouterLink, RouterModule, NavBarComponent, NgOptimizedImage],
  templateUrl: './baseball-scorer-home.component.html',
  styleUrl: './baseball-scorer-home.component.css',
})
export class BaseballScorerHomeComponent {}
