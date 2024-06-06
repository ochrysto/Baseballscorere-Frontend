import { Component, Input } from '@angular/core';
import { GamePageService } from '../../services/game-page.service';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { GameStateGet } from '../../models/game-state-get';
import { ActionsGet } from '../../models/actions-get';
import { LineUpPlayerGet } from '../../models/line-up-player-get';

@Component({
  selector: 'app-game-ballpark',
  standalone: true,
  imports: [NgClass, NgOptimizedImage],
  templateUrl: './ballpark.component.html',
  styleUrl: './ballpark.component.css',
})
export class BallparkComponent {
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

  @Input()
  get defencivePlayers(): LineUpPlayerGet[] {
    return this._defensivePlayers;
  }

  set defencivePlayers(players: LineUpPlayerGet[]) {
    this._defensivePlayers = [...players].sort((a, b) => a.position - b.position);
  }

  @Input()
  get base(): number {
    return this._selectedBase;
  }

  set base(base: number) {
    this._selectedBase = base;
  }

  private _defensivePlayers: LineUpPlayerGet[] = [];
  private _gameState!: GameStateGet;
  private _actions!: ActionsGet;
  private _selectedBase: number = 0;
  public selectedPlayers: Set<number> = new Set<number>(); // Track selected players

  constructor(protected service: GamePageService) {
    service.selectedPlayers$.subscribe({
      next: (value) => (this.selectedPlayers = new Set(value)),
      error: (err) => 'Cannot get updated `selectedPlayers` list: ' + err,
    });
  }

  selectBase(number: number) {
    this.service.updateSelectedBase(number);
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
