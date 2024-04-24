import {Component, Inject, OnInit} from '@angular/core';
import {LineUpPlayers} from "../../models/line-up-players";
import {GamePageService} from "../../services/game-page.service";

@Component({
  selector: 'app-game-ballpark',
  standalone: true,
  imports: [],
  templateUrl: './ballpark.component.html',
  styleUrl: './ballpark.component.css'
})
export class BallparkComponent implements OnInit{

  homeTeam: LineUpPlayers[] = [];
  visitorTeam: LineUpPlayers[] = [];
   constructor(private gamePageService: GamePageService) {
  }
   ngOnInit() {
    this.visitorTeam = this.gamePageService.getAllGuestPlayer();
    this.homeTeam = this.gamePageService.getAllHomePlayers();
   }

}
