import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { FormsModule } from '@angular/forms';
import {
  TeaminformationenBearbeitenComponent
} from '../teaminformationen-bearbeiten/teaminformationen-bearbeiten.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TeamService } from '../../services/Team.service';
import { TeamGet } from '../../models/team-get';

@Component({
  selector: 'app-teammitglieder-hinzufuegen',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, PlayerFormComponent, TeaminformationenBearbeitenComponent, RouterLink],
  templateUrl: './teammitglieder-hinzufuegen.component.html',
  styleUrls: ['./teammitglieder-hinzufuegen.component.css']
})
export class TeammitgliederHinzufuegenComponent implements OnInit {
  logo: string = 'assets/logo.png';
  team: TeamGet | null = null;
  teamId: number | null = null;
  players: any[] = [];
  isPopupVisible: boolean = false;

  constructor(private route: ActivatedRoute, private teamService: TeamService) {
    this.teamService.playerWasAdded$.subscribe({
      next: _ => this.fetchPlayers(),
      error: err => alert('Error: ' + err)
    });

    this.teamService.teamWasUpdated$.subscribe({
      next: _ => this.updateTeam(),
      error: err => alert('Error: ' + err)
    })
  }

  ngOnInit() {
    // Get the team ID from the URL
    this.route.params.subscribe(params => {
      this.teamId = +params['id']; // The '+' converts the string to a number
      this.updateTeam();
      this.fetchPlayers();
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
        this.players = players.map(player => ({
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
      // Store original values before editing
      player.originalNachname = player.Nachname;
      player.originalPassnummer = player.passnummer;
      player.originalVorname = player.Vorname;
    } else {
      // Revert to original values on cancel
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
    debugger;
    this.teamService.updatePlayer(player.id, updatedPlayer).subscribe(() => {
      player.editing = false;
    });
  }

  deletePlayer(index: number) {
    debugger;
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
