import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TeamServesService} from "../../services/team-serves.service";
import {TeamGet} from "../../models/team-get";
import {AssociationGet} from "../../models/association-get";
import {LeagueGet} from "../../models/league-get";
import {AssociationService} from "../../services/association.service";
import {LeagueService} from "../../services/league.service";
import {GameService} from "../../services/game.service";
import {GamePost} from "../../models/game-post";

@Component({
  selector: 'app-game-create',
  standalone: true,
  templateUrl: './game-create.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrl: './game-create.css'
})
export class GameCreate {
  teams: TeamGet[] = [];
  associations: AssociationGet[] = [];
  leagues: LeagueGet[] = [];
  // Input data from HTML
  innings: number = 1;
  association?: AssociationGet;
  league?: LeagueGet;
  awayTeam?: TeamGet;
  homeTeam?: TeamGet;

  gameForm = new FormGroup({
    gameNr: new FormControl(''), // number,
    date: new FormControl(''), // number,
    location: new FormControl(''), // string,
    innings: new FormControl(''), // number,
    associationId: new FormControl(''), // number,
    leagueId: new FormControl(''), // number,
    hostTeamId: new FormControl(''), // number,
    guestTeamId: new FormControl(''), // number,
    umpireIdsList: new FormControl(''), // number[]
    scorerId: new FormControl(''), // number,
  })

  constructor(private teamService: TeamServesService, private associationService: AssociationService, private leagueService: LeagueService, private gameService: GameService) {
    this.getTeams();
    this.getAssociations();
    this.getLeagues()
  }

  private getTeams() {
    this.teamService.getAllTeams().subscribe({
      next: value => this.teams = value,
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

  public createGame() {
    if (!this.awayTeam) {
      console.error("Away team was not provided!");
      return
    }
    if (!this.homeTeam) {
      console.error("Home team was not provided!");
      return
    }
    if (!this.association) {
      console.error("Association was not provided!");
      return
    }
    if (!this.league) {
      console.error("League was not provided!");
      return
    }

    let gameData: GamePost = {
      associationId: this.association.id,
      date: 0,
      gameNr: 0,
      guestTeamId: this.awayTeam.teamId,
      hostTeamId: this.homeTeam.teamId,
      innings: this.innings,
      leagueId: this.league.id,
      location: "",
      scorerId: 0,
      umpireIdsList: []
    }

    this.gameService.postGame(gameData).subscribe({
      next: value => console.log("Successfully created a game: " + value),
      error: err => console.error("Cannot create a game: " + err)
    })
  }
}
