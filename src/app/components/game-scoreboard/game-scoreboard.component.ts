import { Component, Input, OnInit } from '@angular/core';
import { GamePageService } from '../../services/game-page.service';
import { GameStateGet } from '../../models/game-state-get';
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
  get gameState() {
    return this._gameState
  }

  set gameState(gameState: GameStateGet) {
    this._gameState = gameState
  }

  @Input()
  get game() {
    return this._game
  }

  set game(game: GameGet) {
    this._game = game
  }

  private _gameState!: GameStateGet;
  private _game!: GameGet;

  constructor(private service: GamePageService) {
  }

  changeInningStatus(inningStatus: string) {
    this.service.setInningStatus(inningStatus);
  }

  ngOnInit(): void {
  }

}
