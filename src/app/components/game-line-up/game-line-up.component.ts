import { Component, Input } from '@angular/core';
import { DiamondComponent } from '../diamond/diamond.component';
import { NgIf } from '@angular/common';
import { OffensiveActionsGet } from '../../models/offensive-actions-get';
import { GameStateGet } from '../../models/game-state-get';

@Component({
  selector: 'app-game-line-up',
  standalone: true,
  imports: [DiamondComponent, NgIf],
  templateUrl: './game-line-up.component.html',
  styleUrl: './game-line-up.component.css',
})
export class GameLineUpComponent {
  @Input()
  get gameState(): GameStateGet {
    return this._gameState;
  }

  set gameState(gameState: GameStateGet) {
    this._gameState = gameState;
  }

  @Input()
  get visitorTeamDiamonds() {
    return this._visitorTeamDiamonds;
  }

  set visitorTeamDiamonds(diamonds: OffensiveActionsGet[][]) {
    this._visitorTeamDiamonds = diamonds;
  }

  @Input()
  get homeTeamDiamonds() {
    return this._homeTeamDiamonds;
  }

  set homeTeamDiamonds(diamonds: OffensiveActionsGet[][]) {
    this._homeTeamDiamonds = diamonds;
  }

  /**
   * default inning to be shown in line-up
   * @protected
   */
  protected chosenInning: number = 1;

  _visitorTeamDiamonds: OffensiveActionsGet[][] = [];
  _homeTeamDiamonds: OffensiveActionsGet[][] = [];
  _gameState!: GameStateGet;

  /**
   * turns position numbers into strings for better representation
   */
  numberToStringMap: { [key: number]: string } = {
    1: 'P',
    2: 'C',
    3: '1B',
    4: '2B',
    5: '3B',
    6: 'SS',
    7: 'LF',
    8: 'CF',
    9: 'RF',
  };

  /**
   * changes presentation of diamonds to the previous inning
   */
  getPrevInning() {
    this.chosenInning--;
  }

  /**
   * changes presentation of diamonds to the next inning
   */
  getNextInning() {
    this.chosenInning++;
  }
}
