import { Component, Input, OnInit } from '@angular/core';
import { GamePageService } from '../../services/game-page.service';
import { LineUpPlayers } from '../../models/line-up-players';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { GameStateGet } from '../../models/game-state-get';
import { LineupPlayerGet } from '../../models/lineup-player-get';

@Component({
  selector: 'app-on-base',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './on-base.component.html',
  styleUrl: './on-base.component.css'
})
export class OnBaseComponent implements OnInit {
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

  private placeholderPlayer: LineupPlayerGet = {
    id: 0,
    firstName: '-',
    lastName: '-',
    passnumber: 0,
    jerseyNr: 0,
    position: '-'
  }

  onBaseList: LineUpPlayers[] = [];
  _gameState!: GameStateGet;
  GuestOnBaselist: LineUpPlayers[] = [];
  HomeOnBaseList: LineUpPlayers[] = [];
  protected currentInningStatus!: string;
  private _responsible: number[] = [];
  _base!: number;

  constructor(protected gamePageService: GamePageService) {
  }

  ngOnInit(): void {
    this.GuestOnBaselist = this.gamePageService.getAllGuestPlayer();
    this.HomeOnBaseList = this.gamePageService.getAllHomePlayers();
    this.gamePageService.inningStatus$.subscribe(inningStatus => {
      this.currentInningStatus = inningStatus;
    });
  }

  getHomePlayerName(index: number): string {
    return this.HomeOnBaseList?.at(index)?.jerseyNr + ' '
      + this.HomeOnBaseList?.at(index)?.firstname + ' '
      + this.HomeOnBaseList?.at(index)?.lastname || '';
  }

  getGuestPlayerName(index: number): string {
    return this.GuestOnBaselist?.at(index)?.jerseyNr + ' '
      + this.GuestOnBaselist?.at(index)?.firstname + ' '
      + this.GuestOnBaselist?.at(index)?.lastname || '';
  }

  generateCurrentPlayerStatus(): string {
    return this.responsible.join('-');
  }

  getSelectedPlayer(): LineupPlayerGet {
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

  generateText(player: LineupPlayerGet): string {
    return `${player.jerseyNr} ${player.firstName} ${player.lastName}`;
  }
}
