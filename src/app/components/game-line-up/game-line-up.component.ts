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

  constructor(private gamePageService: GamePageService) {
  }
  ngOnInit() {
    this.visitorTeam = this.gamePageService.getAllGuestPlayer();
    this.homeTeam = this.gamePageService.getAllHomePlayers();
  }


}


