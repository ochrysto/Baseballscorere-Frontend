import {Component, Input, OnInit} from '@angular/core';
import {GamePageService} from "../../services/game-page.service";
import {LineUpPlayers} from "../../models/line-up-players";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {NgIf} from "@angular/common";

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

  onBaseList: LineUpPlayers[] = [];
  GuestOnBaselist: LineUpPlayers[] = [];
  HomeOnBaseList: LineUpPlayers[] = [];
  protected currentInningStatus!: string;
  private _responsible: number[] = [];

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


}
