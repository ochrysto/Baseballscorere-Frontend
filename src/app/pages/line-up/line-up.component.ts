import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientModule} from '@angular/common/http';
import {LineUpService} from "../../services/line-up.service";
import {NgClass, NgForOf} from "@angular/common";
import {PlayerGet} from "../../models/player-get";
import {GameGet} from "../../models/game-get";
import {switchMap} from "rxjs";
import {GameService} from "../../services/game.service";
import {LineUpPost} from "../../models/line-up-post";
import {LineUpPlayerPost} from "../../models/line-up-player-post";
import {PositionService} from "../../services/position.service";
import {PositionGet} from "../../models/position-get";
import { LineUpPlayers } from '../../models/line-up-players';


@Component({
  selector: 'app-line-up',
  templateUrl: './line-up.component.html',
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgClass,
    NgForOf,
  ],
  standalone: true,
  styleUrls: ['./line-up.component.css']
})
export class LineUpComponent implements OnInit {
  @Input() game!: GameGet;
  homePlayers: PlayerGet[] = [];
  awayPlayers: PlayerGet[] = [];
  positions: PositionGet[] = [];
  activeTab: string = 'HEIM';

  lineUpForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lineUpService: LineUpService,
    private gameService: GameService,
    private positionService: PositionService,
    private fb: FormBuilder
  ) {
    this.lineUpForm = this.fb.group({
      homeLineUp: this.fb.array([]),
      awayLineUp: this.fb.array([])
    });
    this.positionService.getPositions().subscribe({
      next: positions => this.positions = positions,
      error: err => console.error("Cannon get positions: " + err)
    });
  }

  get homeLineUp(): FormArray {
    return this.lineUpForm.get('homeLineUp') as FormArray;
  }

  get awayLineUp(): FormArray {
    return this.lineUpForm.get('awayLineUp') as FormArray;
  }

  switchTab(tabName: string): void {
    this.activeTab = tabName;
    this.updateContainerBorder();
  }

  updateContainerBorder(): void {
    const border = document.querySelector('.border') as HTMLElement;
    if (border) {
      border.classList.remove('active-home', 'active-guest');
      if (this.activeTab === 'HEIM') {
        border.classList.add('active-home');
      } else if (this.activeTab === 'GAST') {
        border.classList.add('active-guest');
      }
    } else {
      console.error('border element not found!');
    }
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const gameId = +params.get('id')!;
        return this.gameService.getGame(gameId);
      })
    ).subscribe(game => {
      this.game = game;
      this.fetchPlayers(game.hostTeam.teamId, 'home');
      this.fetchPlayers(game.guestTeam.teamId, 'away');
    });
  }

  fetchPlayers(teamId: number, teamType: 'home' | 'away'): void {
    this.lineUpService.getPlayersByTeamId(teamId).subscribe(players => {
      if (teamType === 'home') {
        this.homePlayers = players;
        this.populateLineUpForm(this.homeLineUp, players);
      } else {
        this.awayPlayers = players;
        this.populateLineUpForm(this.awayLineUp, players);
      }
    });
  }

  populateLineUpForm(lineUpFormArray: FormArray, players: PlayerGet[]): void {
    players.forEach(() => {
      lineUpFormArray.push(this.fb.group({
        playerId: [''],
        passNumber: [''],
        position: ['']
      }));
    });
  }

  onSubmit(): void {
    const homeLineUp = this.lineUpForm.value.homeLineUp;
    const awayLineUp = this.lineUpForm.value.awayLineUp;

    const homeLineUpPlayers: LineUpPlayerPost[] = homeLineUp.map((lineUp: any) => ({
      // teamId: this.game.hostTeam.teamId,
      playerId: lineUp.playerId,
      jerseyNr: lineUp.passNumber,
      positionId: lineUp.position
    }));

    const homeLineUpPost: LineUpPost = {
      teamId: this.game.hostTeam.teamId,
      gameId: this.game.id,
      playerList: homeLineUpPlayers
    }

    const awayLineUpPlayers: LineUpPlayerPost[] = awayLineUp.map((lineUp: any) => ({
      // teamId: this.game.guestTeam.teamId,
      playerId: lineUp.playerId,
      jerseyNr: lineUp.passNumber,
      positionId: lineUp.position
    }));

    const awayLineUpPost: LineUpPost = {
      teamId: this.game.guestTeam.teamId,
      gameId: this.game.id,
      playerList: awayLineUpPlayers
    }

    this.lineUpService.submitLineUp([homeLineUpPost, awayLineUpPost]).subscribe(() => {
      this.gameService.createFirstTurn(this.game.id).subscribe({
        next: msg => {
          this.router.navigate(['/game', this.game.id]);
        },
        error: err => console.error("Cannot create a first turn: " + err)
      })
    });
  }

  //dummy lists before backend connection
  public visitorTeam: LineUpPlayers[] = [
    {
      battingOrder: 1,
      jerseyNr: '36',
      firstname: 'Frank',
      lastname: 'Riermeister',
      position: 2,
      passNumber: 666382
    },
    {
      battingOrder: 2,
      jerseyNr: '9',
      firstname: 'Andre',
      lastname: 'Siener',
      position: 1,
      passNumber: 554932
    },
    {
      battingOrder: 3,
      jerseyNr: '3',
      firstname: 'Matthias',
      lastname: 'Gilde',
      position: 5,
      passNumber: 443926
    },
    {
      battingOrder: 4,
      jerseyNr: '73',
      firstname: 'Thorsten',
      lastname: 'Laack',
      position: 6,
      passNumber: 546738
    },
    {
      battingOrder: 5,
      jerseyNr: '12',
      firstname: 'Peter',
      lastname: 'Frank',
      position: 8,
      passNumber: 546389
    },
    {
      battingOrder: 6,
      jerseyNr: '78',
      firstname: 'Norbert',
      lastname: 'Schwertner',
      position: 7,
      passNumber: 765449
    },
    {
      battingOrder: 7,
      jerseyNr: '56',
      firstname: 'Connie',
      lastname: 'Ritter',
      position: 4,
      passNumber: 563722
    },
    {
      battingOrder: 8,
      jerseyNr: '20',
      firstname: 'Markus',
      lastname: 'Kleininger',
      position: 9,
      passNumber: 964532
    },
    {
      battingOrder: 9,
      jerseyNr: '39',
      firstname: 'Steffen',
      lastname: 'Sammert',
      position: 3,
      passNumber: 657486
    }
  ]
}
