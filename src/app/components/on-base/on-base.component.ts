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
  onBaseList: LineUpPlayers[] = [];
  /* isTopInning: boolean = this.gamePageService.isTopInning;
   isBottomInning: boolean = this.gamePageService.isBottomInning;*/
  GuestOnBaselist: LineUpPlayers[] = [];
  HomeOnBaseList: LineUpPlayers[] = [];
  protected currentInningStatus!: string;

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
    return this.HomeOnBaseList?.at(index)?.jerseyNumber + ' '
      + this.HomeOnBaseList?.at(index)?.firstname + ' '
      + this.HomeOnBaseList?.at(index)?.lastname || '';
  }

  getGuestPlayerName(index: number): string {
    return this.GuestOnBaselist?.at(index)?.jerseyNumber + ' '
      + this.GuestOnBaselist?.at(index)?.firstname + ' '
      + this.GuestOnBaselist?.at(index)?.lastname || '';
  }


}
