import { Component, OnInit } from '@angular/core';
import { GameLineUpComponent } from '../../components/game-line-up/game-line-up.component';
import { GameHeaderComponent } from '../../components/game-header/game-header.component';
import { BallparkComponent } from '../../components/game-ballpark/ballpark.component';
import { OnBaseComponent } from '../../components/on-base/on-base.component';
import { GameInputComponent } from '../../components/game-input/game-input.component';
import { GameScoreboardComponent } from '../../components/game-scoreboard/game-scoreboard.component';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { GamePageService } from '../../services/game-page.service';
import { GameGet } from '../../models/game-get';
import { GameStateGet } from '../../models/game-state-get';
import { OffensiveActionsGet } from '../../models/offensive-actions-get';
import { ActionsGet } from '../../models/actions-get';
import { LineUpPlayerGet } from '../../models/line-up-player-get';

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
  public game!: GameGet;
  public gameState!: GameStateGet;
  public gameActions!: ActionsGet;
  public defencivePlayers: LineUpPlayerGet[] = [];
  public visitorTeamDiamonds: OffensiveActionsGet[][] = [];
  public homeTeamDiamonds: OffensiveActionsGet[][] = [];
  public selectedBase: number = 0;
  public selectedPlayers: number[] = [];

  constructor(private route: ActivatedRoute, private gameService: GameService, private service: GamePageService) {
    this.service.isChanged$.subscribe({
      next: value => this.refreshAllData(),
      error: err => console.error('Cannot refresh all data: ' + err)
    });

    this.service.isGameFetched$.subscribe({
      next: value => {
        this.refreshAllData();
        console.log('Successfully refreshed game data');
      },
      error: error => console.log('Cannot refresh game data: ' + error)
    });

    this.service.selectedBase$.subscribe({
      next: base => {
        this.selectedBase = base;
        console.log('Changed selected base to ' + base);
      }
    });

    this.service.selectedPlayers$.subscribe({
      next: players => {
        this.selectedPlayers = players;
        console.log('Selected players updated: ' + players);
      }
    });
  }

  refreshAllData() {
    // update game state
    this.service.getGameState(this.game.id).subscribe({
      next: (state) => this.gameState = state,
      error: (err) => console.log('cannot get game state', err)
    });

    // update game actions
    this.service.getGameActions(this.game!.id).subscribe({
      next: actions => {
        this.gameActions = actions;
        console.log('Successfully fetched new actions from a backend');
      },
      error: error => console.log('Cannot refresh game data: ' + error)
    });

    // Refresh diamonds on game change
    this.service.isChanged$.subscribe({
      next: value => {
        this.service.getGameDiamonds(this.game.id, 'AWAY').subscribe({
          next: diamonds => this.visitorTeamDiamonds = diamonds
        });
        this.service.getGameDiamonds(this.game.id, 'HOME').subscribe({
          next: diamonds => this.homeTeamDiamonds = diamonds
        });
      }
    });

    // Refresh defencive lineup
    this.service.getDefenciveTeamLineup(this.game!.id).subscribe({
      next: players => this.defencivePlayers = players,
      error: error => console.log('Cannot refresh defencive players: ' + error)
    })
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const gameId = +params.get('id')!;
        return this.gameService.getGame(gameId);
      })
    ).subscribe(game => {
      this.game = game;
      this.refreshAllData();
    });
  }
}
