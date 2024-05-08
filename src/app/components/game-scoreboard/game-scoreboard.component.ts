import { Component } from '@angular/core';
import {GamePageService} from "../../services/game-page.service";

@Component({
  selector: 'app-game-scoreboard',
  standalone: true,
  imports: [],
  templateUrl: './game-scoreboard.component.html',
  styleUrl: './game-scoreboard.component.css'
})
export class GameScoreboardComponent {
  private currentInningStatus!: string;

  constructor(private gamePageService: GamePageService) {
  }

  changeInningStatus(inningStatus: string) {
    this.gamePageService.setInningStatus(inningStatus);
   }

}
