import {Component, Input, OnInit} from '@angular/core';
import {GamePageService} from "../../services/game-page.service";
import { GameScoreGet } from '../../models/game-score-get';
import {ScoreboardInningGet} from "../../models/scoreboard-inning-get";


@Component({
  selector: 'app-game-scoreboard',
  standalone: true,
  imports: [],
  templateUrl: './game-scoreboard.component.html',
  styleUrl: './game-scoreboard.component.css'
})
export class GameScoreboardComponent implements OnInit {
  private currentInningStatus!: string;
  protected gamesScore!: GameScoreGet;
  protected scoreBoardInnings!: ScoreboardInningGet[];


  constructor(private gamePageService: GamePageService) {
  }

  changeInningStatus(inningStatus: string) {
    this.gamePageService.setInningStatus(inningStatus);
  }

  ngOnInit(): void {
    this.gamesScore = this.gamePageService.getGameScore();
    this.scoreBoardInnings = this.gamePageService.getScoreBoardInnings();
  }

}
