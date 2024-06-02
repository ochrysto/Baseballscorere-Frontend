import {Component, OnInit} from '@angular/core';
import {LineUpPlayers} from "../../models/line-up-players";
import {GamePageService} from "../../services/game-page.service";
import {DiamondComponent} from "../diamond/diamond.component";
import {NgIf} from "@angular/common";
import {OffensiveActionsGet} from "../../models/offensive-actions-get";

@Component({
  selector: 'app-game-line-up',
  standalone: true,
  imports: [
    DiamondComponent,
    DiamondComponent,
    NgIf
  ],
  templateUrl: './game-line-up.component.html',
  styleUrl: './game-line-up.component.css'
})
export class GameLineUpComponent implements OnInit {

  /**
   * default inning to be shown in line-up
   * @protected
   */
  protected chosenInning: number = 1;

  visitorTeamDiamonds: OffensiveActionsGet[][] = [];
  homeTeamDiamonds: OffensiveActionsGet[][] = [];
  /**
   * turns position numbers into strings for better representation
   */
  numberToStringMap: { [key: number]: string } = {
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
    // Refresh diamonds on game fetch
    this.gamePageService.isGameFetched$.subscribe({
      next: value => {
        this.gamePageService.getGameDiamonds(this.gamePageService.game!.id, "AWAY").subscribe({
          next: diamonds => this.visitorTeamDiamonds = diamonds
        });
        this.gamePageService.getGameDiamonds(this.gamePageService.game!.id, "HOME").subscribe({
          next: diamonds => this.homeTeamDiamonds = diamonds
        });
      }
    });

    // Refresh diamonds on game change
    this.gamePageService.isChanged$.subscribe({
      next: value => {
        this.gamePageService.getGameDiamonds(this.gamePageService.game!.id, "AWAY").subscribe({
          next: diamonds => this.visitorTeamDiamonds = diamonds
        });
        this.gamePageService.getGameDiamonds(this.gamePageService.game!.id, "HOME").subscribe({
          next: diamonds => this.homeTeamDiamonds = diamonds
        });
      }
    });

    this.gamePageService.inningStatus$.subscribe(inningStatus => {
      this.currentInningStatus = inningStatus;
    });
  }

  /**
   * changes presentation of diamonds to the previous inning
   */
  getPrevInning() {
    this.chosenInning--;
  }
  /**
   * changes presentation of diamonds to the next inning
   */
  getNextInning() {
    this.chosenInning++;
  }
}


