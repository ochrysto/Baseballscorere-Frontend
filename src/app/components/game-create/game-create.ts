import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TeamGet} from "../../models/team-get";
import {AssociationGet} from "../../models/association-get";
import {LeagueGet} from "../../models/league-get";
import {AssociationService} from "../../services/association.service";
import {LeagueService} from "../../services/league.service";
import {GameService} from "../../services/game.service";
import {GamePost} from "../../models/game-post";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ScorerService} from "../../services/scorer.service";
import {ScorerGet} from "../../models/scorer-get";
import {UmpireService} from "../../services/umpire.service";
import {UmpireGet} from "../../models/umpire-get";
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-game-create',
  standalone: true,
  templateUrl: './game-create.html',
  styleUrls: ['./game-create.css'],
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    NgForOf,
    NavBarComponent
  ],
  providers: [DatePipe]
})
export class GameCreate {
  teams: TeamGet[] = [];
  associations: AssociationGet[] = [];
  leagues: LeagueGet[] = [];
  scorers: ScorerGet[] = [];
  umpires: UmpireGet[] = [];
  gameForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private associationService: AssociationService,
    private leagueService: LeagueService,
    private gameService: GameService,
    private scorerService: ScorerService,
    private umpireService: UmpireService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.gameForm = this.fb.group({
      gameNr: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      innings: [1, [Validators.required, Validators.min(5), Validators.max(35)]],
      associationId: ['', Validators.required],
      leagueId: ['', Validators.required],
      hostTeamId: ['', Validators.required],
      guestTeamId: ['', Validators.required],
      umpireIdsList: [[]],
      scorerId: ['']
    });
    this.getTeams();
    this.getAssociations();
    this.getLeagues();
    this.getScorers();
    this.getUmpires();
  }

  private getTeams() {
    this.teamService.getAllTeams().subscribe({
      next: teams => this.teams = teams,
      error: err => console.error("Cannot get teams: " + err)
    });
  }

  private getAssociations() {
    this.associationService.getAllAssociations().subscribe({
      next: value => this.associations = value,
      error: err => console.error("Cannot get associations: " + err)
    });
  }

  private getLeagues() {
    this.leagueService.getAllLeagues().subscribe({
      next: value => this.leagues = value,
      error: err => console.error("Cannot get leagues: " + err)
    });
  }

  private getScorers() {
    this.scorerService.getAllScorers().subscribe({
      next: value => this.scorers = value,
      error: err => console.error("Cannot get scorers: " + err)
    });
  }

  private getUmpires() {
    this.umpireService.getAllUmpires().subscribe({
      next: value => this.umpires = value,
      error: err => console.error("Cannot get umpires: " + err)
    });
  }

  public createGame() {
    if (this.gameForm.invalid) {
      this.gameForm.markAllAsTouched();  // Mark all fields as touched to trigger validation messages
      console.error("Form is invalid!");
      return;
    }

    const formValues = this.gameForm.value;
    let formattedDate = this.datePipe.transform(formValues.date, 'yyyy-MM-dd');

    let gameData: GamePost = {
      associationId: formValues.associationId,
      date: formattedDate!,
      gameNr: formValues.gameNr,
      guestTeamId: formValues.guestTeamId,
      hostTeamId: formValues.hostTeamId,
      innings: formValues.innings,
      leagueId: formValues.leagueId,
      location: formValues.location,
      scorerId: formValues.scorerId,
      umpireIdsList: [formValues.umpireIdsList]
    }

    this.gameService.postGame(gameData).subscribe({
      next: value => {
        console.log("Successfully created a game: " + value);
        this.router.navigate(['/game', value.id, 'line-up']);
      },
      error: err => console.error("Cannot create a game: " + err)
    });
  }

  public getFieldError(controlName: string): boolean | null {
    const control = this.gameForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
