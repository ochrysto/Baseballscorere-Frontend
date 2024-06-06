import {Component, OnInit} from '@angular/core';
import {CommonModule, NgFor, NgOptimizedImage} from '@angular/common';
import {PlayerFormComponent} from '../player-form/player-form.component';
import {FormsModule} from '@angular/forms';
import {TeamEditComponent} from '../team-edit/team-edit.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TeamService} from '../../services/team.service';
import {TeamGet} from '../../models/team-get';

@Component({
  selector: 'app-team-player-add',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, PlayerFormComponent, TeamEditComponent, RouterLink, NgOptimizedImage],
  templateUrl: './team-player-add.component.html',
  styleUrls: ['./team-player-add.component.css']
})
export class TeamPlayerAddComponent implements OnInit {
  logo: string = 'assets/logo.png';
  _team: TeamGet | null = null;
  teamId: number | null = null;
  players: any[] = [];
  isPopupVisible: boolean = false;


  get team(): TeamGet | null {
    return this._team;
  }

  set team(team: TeamGet) {
    this._team = team;
    this.fetchPlayers();
  }

  constructor(private route: ActivatedRoute, private teamService: TeamService) {
    this.teamService.playerWasAdded$.subscribe({
      next: () => this.fetchPlayers(),
      error: err => alert('Error: ' + err)
    });

    this.teamService.teamWasUpdated$.subscribe({
      next: () => this.updateTeam(),
      error: err => alert('Error: ' + err)
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamId = +params['id']; // The '+' converts the string to a number
      this.updateTeam();
    });
  }

  updateTeam() {
    if (this.teamId == null) {
      console.error('Cannot get team because team id is null');
      return;
    }

    this.teamService.getTeam(this.teamId).subscribe({
      next: team => this.team = team,
      error: err => alert('Cannot get team with id ' + this.teamId + '. Err: ' + err)
    });
  }

  fetchPlayers() {
    if (this.team == null) {
      console.error('Cannot get team players because team object is null');
      return;
    }
    this.teamService.getAllTeamPlayers(this.team.teamId).subscribe({
      next: players => {
        this.players = players.sort((a, b) => a.id - b.id).map(player => ({
          id: player.id,
          Vorname: player.firstName,
          Nachname: player.lastName,
          passnummer: player.passnumber,
          editing: false,
          originalNachname: '',
          originalPassnummer: '',
          originalVorname: ''
        }));
      },
      error: error => console.error('Error fetching players:', error)
    });
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  toggleEdit(index: number) {
    const player = this.players[index];
    if (!player.editing) {
      player.originalNachname = player.Nachname;
      player.originalPassnummer = player.passnummer;
      player.originalVorname = player.Vorname;
    } else {
      player.Nachname = player.originalNachname;
      player.passnummer = player.originalPassnummer;
      player.Vorname = player.originalVorname;
    }
    player.editing = !player.editing;
  }

  submitEdit(index: number) {
    const player = this.players[index];
    const updatedPlayer = {
      firstName: player.Vorname,
      lastName: player.Nachname,
      passnumber: player.passnummer
    };

    this.teamService.updatePlayer(player.id, updatedPlayer).subscribe(() => {
      player.editing = false;
    });
  }

  deletePlayer(index: number) {
    if (this.team == null) {
      console.error('Cannot delete team player because team object is null')
      return;
    }

    const player = this.players[index];
    this.teamService.deletePlayer(this.team.teamId, player.id).subscribe(() => {
      this.players.splice(index, 1);
    });
  }
}
