import {Component, Input, OnInit} from '@angular/core';
import {GamePageService} from "../../services/game-page.service";
import { GameScore } from '../../models/gameScore';
import {ScoreBoardInning} from "../../models/scoreBoardInning";


@Component({
  selector: 'app-game-scoreboard',
  standalone: true,
  imports: [],
  templateUrl: './game-scoreboard.component.html',
  styleUrl: './game-scoreboard.component.css'
})
export class GameScoreboardComponent implements OnInit {
  private currentInningStatus!: string;
  protected gamesScore!: GameScore;
  protected scoreBoardInnings!: ScoreBoardInning[];


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
