import {Component, OnInit} from '@angular/core';
import {LineUpPlayers} from "../../models/line-up-players";
import {GamePageService} from "../../services/game-page.service";
import {NgClass} from "@angular/common";
import {GameStateGet} from "../../models/game-state-get";

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
  protected gameState: GameStateGet | undefined;

  constructor(protected service: GamePageService) {
    this.service.isChanged$.subscribe({
      next: value => {
        this.refresh();
        console.log("succesfully refreshed ballpark component");
      },
      error: error => {console.log("Refresh fehlt")}
    });

    this.service.isGameFetched$.subscribe({
      next: value => {
        this.refresh();
        console.log("succesfully refreshed ballpark component");
      },
      error: error => {console.log("Refresh fehlt")}
    })
  }

  ngOnInit() {
    this.visitorTeam = this.service.getAllGuestPlayer();
    this.homeTeam = this.service.getAllHomePlayers();
    this.defensiveHomeTeam = [...this.homeTeam].sort((a, b) => a.position - b.position);
    this.defensiveGuestTeam = [...this.visitorTeam].sort((a, b) => a.position - b.position);
    this.service.inningStatus$.subscribe(inningStatus => {
      this.currentInningStatus = inningStatus;
    });
  }

  /**
   * rerenders the page
   * @protected
   */
  protected refresh() {
    if (!this.service.game?.id) {
      console.error("Game id not found! Check `GamePageService`!")
      return;
    }

    setTimeout(() => {
      return this.service.getGameState(this.service.game!.id).subscribe({
        next: (state) => {
          this.gameState = state
        },
        error: (err) => {
          console.log("cannot get game state", err);
        }
      });
    }, 400);
  }

  /**
   * selects the offensive player
   * @param number identifies the baseposition
   */
  selectBase(number: number) {
    this.service.selectedBase.next(number);
  }
}
