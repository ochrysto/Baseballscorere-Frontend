import { Component } from '@angular/core';
import {GameLineUpComponent} from "../../components/game-line-up/game-line-up.component";

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    GameLineUpComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent {

}
