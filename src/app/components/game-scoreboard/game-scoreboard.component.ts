import {Component, Input, OnInit} from '@angular/core';
import {GamePageService} from "../../services/game-page.service";
import { GameScoreGet } from '../../models/game-score-get';
import {ScoreboardInningGet} from "../../models/scoreboard-inning-get";
import {GameStateGet} from "../../models/game-state-get";
import { GameGet } from '../../models/game-get';


@Component({
  selector: 'app-game-scoreboard',
  standalone: true,
  imports: [],
  templateUrl: './game-scoreboard.component.html',
  styleUrl: './game-scoreboard.component.css'
})
export class GameScoreboardComponent implements OnInit {
  @Input()
  get gameState() { return this._gameState }
  set gameState(gameState: GameStateGet) { this._gameState = gameState }

  @Input()
  get game() { return this._game }
  set game(game: GameGet) { this._game = game }

  // private currentInningStatus!: string;
  // protected gamesScore!: GameScoreGet;
  // protected scoreBoardInnings!: ScoreboardInningGet[];
  private _gameState!: GameStateGet;
  private _game!: GameGet;


  constructor(private service: GamePageService) {
    // this.service.isChanged$.subscribe({
    //   next: value => {
    //     this.refresh();
    //     console.log("succesfully refreshed scoreboard component");
    //   },
    //   error: error => {console.log("Refresh fehlt")}
    // });
    //
    // this.service.isGameFetched$.subscribe({
    //   next: value => {
    //     this.refresh();
    //     console.log("succesfully refreshed scoreboard component");
    //   },
    //   error: error => {console.log("Refresh fehlt")}
    // })
  }

  changeInningStatus(inningStatus: string) {
    this.service.setInningStatus(inningStatus);
  }

  ngOnInit(): void {
    // this.gamesScore = this.service.getGameScore();
    // this.scoreBoardInnings = this.service.getScoreBoardInnings();
  }

  // protected refresh() {
  //   if (!this.service.game?.id) {
  //     console.error("Game id not found! Check `GamePageService`!")
  //     return;
  //   }
  //
  //   setTimeout(() => {
  //     return this.service.getGameState(this.service.game!.id).subscribe({
  //       next: (state) => {
  //         this._gameState = state
  //       },
  //       error: (err) => {
  //         console.log("cannot get game state", err);
  //       }
  //     });
  //   }, 400);
  // }

  // getAwayTeamName() {
  //   return this.service.game?.guestTeam.name;
  // }

  // getHomeTeamName() {
  //   return this.service.game?.hostTeam.name;
  // }

}
