import {Component, OnInit} from '@angular/core';
import {GameLineUpComponent} from "../../components/game-line-up/game-line-up.component";
import {GameHeaderComponent} from "../../components/game-header/game-header.component";
import {BallparkComponent} from "../../components/game-ballpark/ballpark.component";
import {OnBaseComponent} from "../../components/on-base/on-base.component";
import {GameInputComponent} from "../../components/game-input/game-input.component";
import {GameScoreboardComponent} from "../../components/game-scoreboard/game-scoreboard.component";
import {switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../../services/game.service";
import {GamePageService} from "../../services/game-page.service";

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    GameLineUpComponent,
    GameHeaderComponent,
    BallparkComponent,
    OnBaseComponent,
    GameInputComponent,
    GameScoreboardComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private gameService: GameService, private gamePageService: GamePageService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const gameId = +params.get('id')!;
        return this.gameService.getGame(gameId);
      })
    ).subscribe(game => {
      this.gamePageService.game = game;
      this.gamePageService.toggleIsGameFetched();
    });
  }
}
