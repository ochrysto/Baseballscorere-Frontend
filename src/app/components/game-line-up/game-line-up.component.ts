import {Component, inject, OnInit} from '@angular/core';
import {LineUpPlayers} from "../../models/line-up-players";
import {GamePageService} from "../../services/game-page.service";
import {DiamondComponent} from "../diamond/diamond.component";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-game-line-up',
  standalone: true,
  imports: [
    DiamondComponent
  ],
  templateUrl: './game-line-up.component.html',
  styleUrl: './game-line-up.component.css'
})
export class GameLineUpComponent implements OnInit{

  visitorTeam: LineUpPlayers[] = [];
  homeTeam: LineUpPlayers[] = [];
  numberToStringMap: { [key: number]: string} = {
    1: 'P',
    2: 'C',
    3: '1B',
    4: '2B',
    5: '3B',
    6: 'SS',
    7: 'LF',
    8: 'CF',
    9: 'RF'
  }
  protected currentInningStatus!: string;
  constructor(protected gamePageService: GamePageService) {
  }
  ngOnInit() {
    this.visitorTeam = this.gamePageService.getAllGuestPlayer();
    this.homeTeam = this.gamePageService.getAllHomePlayers();
    this.gamePageService.inningStatus$.subscribe(inningStatus => {
      this.currentInningStatus = inningStatus;
    });
  }



}


