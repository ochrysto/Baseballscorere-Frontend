import { Component, Input, OnInit } from '@angular/core';
import { LineUpPlayers } from '../../models/line-up-players';
import { GamePageService } from '../../services/game-page.service';
import { NgClass } from '@angular/common';
import { GameStateGet } from '../../models/game-state-get';
import { ActionsGet } from '../../models/actions-get';
import { LineUpPlayerGet } from '../../models/line-up-player-get';

@Component({
  selector: 'app-game-ballpark',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './ballpark.component.html',
  styleUrl: './ballpark.component.css'
})
export class BallparkComponent implements OnInit {
  @Input()
  get gameState(): GameStateGet {
    return this._gameState;
  }

  set gameState(gameState: GameStateGet) {
    this._gameState = gameState;
  }

  @Input()
  get actions(): ActionsGet {
    return this._actions;
  }

  set actions(actions: ActionsGet) {
    this._actions = actions;
  }

  // @Input()
  // get homePlayers(): LineUpPlayers[] {
  //   return this._defensiveHomeTeam;
  // }
  //
  // set homePlayers(players: LineUpPlayers[]) {
  //   this._defensiveHomeTeam = [...players].sort((a, b) => a.position - b.position);
  // }
  //
  // @Input()
  // get awayPlayers(): LineUpPlayers[] {
  //   return this._defensiveGuestTeam;
  // }
  //
  // set awayPlayers(players: LineUpPlayers[]) {
  //   this._defensiveGuestTeam = [...players].sort((a, b) => a.position - b.position);
  // }

  @Input()
  get defencivePlayers(): LineUpPlayerGet[] {
    return this._defensivePlayers;
  }

  set defencivePlayers(players: LineUpPlayerGet[]) {
    this._defensivePlayers = [...players].sort((a, b) => a.position - b.position);
  }

  // private _defensiveHomeTeam: LineUpPlayers[] = [];
  // private _defensiveGuestTeam: LineUpPlayers[] = [];
  private _defensivePlayers: LineUpPlayerGet[] = [];
  private _gameState!: GameStateGet;
  private _actions!: ActionsGet;
  public selectedPlayers: Set<number> = new Set<number>(); // Track selected players

  constructor(protected service: GamePageService) {
  }

  ngOnInit() {}

  selectBase(number: number) {
    this.service.selectedBase.next(number);
  }

  /**
   * Handles selection of defensive players
   * @param position defensive player position
   */
  selectPlayer(position: number) {
    if (this.selectedPlayers.has(position)) {
      this.selectedPlayers.delete(position);
    } else {
      this.selectedPlayers.add(position);
    }
    this.service.updateSelectedPlayers([...this.selectedPlayers]);
  }
}
