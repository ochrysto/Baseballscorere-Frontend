import { Component, Input } from '@angular/core';
import { GameStateGet } from '../../models/game-state-get';
import { LineUpPlayerGet } from '../../models/line-up-player-get';
import {Button} from "../../models/button";
import {ActionsGet} from "../../models/actions-get";

@Component({
  selector: 'app-on-base',
  standalone: true,
  templateUrl: './on-base.component.html',
  styleUrl: './on-base.component.css'
})
export class OnBaseComponent {
  @Input()
  get responsible(): number[] {
    return this._responsible;
  }

  set responsible(responsible: number[]) {
    this._responsible = responsible;
  }

  @Input()
  get gameState(): GameStateGet {
    return this._gameState
  }

  set gameState(gameState: GameStateGet) {
    this._gameState = gameState
  }

  @Input()
  get base(): number {
    return this._base;
  }

  set base(base: number) {
    this._base = base;
  }

  @Input()
  get selectedButton(): Button | null {
    return this._selectedButton;
  }

  set selectedButton(button: Button | null) {
    this._selectedButton = button;
  }

  private _gameState!: GameStateGet;
  private _selectedButton: Button | null = null;
  private _responsible: number[] = [];
  private _base!: number;

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  //   Method for switching of a selected player   //
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  private placeholderPlayer: LineUpPlayerGet = {
    id: 0,
    firstName: '-',
    lastName: '-',
    passnumber: 0,
    jerseyNr: 0,
    position: 0
  }

  getSelectedPlayer(): LineUpPlayerGet {
    switch (this._base) {
      case 0:
        return this._gameState.batter != null ? this._gameState.batter : this.placeholderPlayer;
      case 1:
        return this._gameState.firstBase != null ? this._gameState.firstBase : this.placeholderPlayer;
      case 2:
        return this._gameState.secondBase != null ? this._gameState.secondBase : this.placeholderPlayer;
      case 3:
        return this._gameState.thirdBase != null ? this._gameState.thirdBase : this.placeholderPlayer;
      default:
        return this.placeholderPlayer;
    }
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  //   Helper methods for HTML rendering   //
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  generateCurrentPlayerStatus(): string {
    if (this.selectedButton != null) {
      return this.selectedButton.button + " " + this.responsible.join('-');
    }
    return this.responsible.join('-');
  }

  generateText(player: LineUpPlayerGet): string {
    return `${player.jerseyNr} ${player.firstName} ${player.lastName}`;
  }
}
