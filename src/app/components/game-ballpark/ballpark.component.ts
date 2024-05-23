import {Component, OnInit} from '@angular/core';
import {LineUpPlayers} from "../../models/line-up-players";
import {GamePageService} from "../../services/game-page.service";
import {NgClass} from "@angular/common";

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

  homeTeam: LineUpPlayers[] = [];
  visitorTeam: LineUpPlayers[] = [];
  protected defensiveHomeTeam: LineUpPlayers[] = [];
  protected defensiveGuestTeam: LineUpPlayers[] = [];
  protected currentInningStatus!: string;

  constructor(protected gamePageService: GamePageService) {
  }

  ngOnInit() {
    this.visitorTeam = this.gamePageService.getAllGuestPlayer();
    this.homeTeam = this.gamePageService.getAllHomePlayers();
    this.defensiveHomeTeam = [...this.homeTeam].sort((a, b) => a.position - b.position);
    this.defensiveGuestTeam = [...this.visitorTeam].sort((a, b) => a.position - b.position);
    this.gamePageService.inningStatus$.subscribe(inningStatus => {this.currentInningStatus = inningStatus;})
  }
}
