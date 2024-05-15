import {Component} from '@angular/core';
import {RouterLink, RouterModule} from "@angular/router";


@Component({
  selector: 'app-baseball-scorer-home',
  standalone: true,
  imports: [
    RouterLink, RouterModule
  ],
  templateUrl: './baseball-scorer-home.component.html',
  styleUrl: './baseball-scorer-home.component.css'
})
export class BaseballScorerHomeComponent {


}
