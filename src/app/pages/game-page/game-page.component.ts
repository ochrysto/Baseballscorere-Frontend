import { Component } from '@angular/core';
import {GameLineUpComponent} from "../../components/game-line-up/game-line-up.component";
import {GameHeaderComponent} from "../../components/game-header/game-header.component";

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    GameLineUpComponent,
    GameHeaderComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent {

}
