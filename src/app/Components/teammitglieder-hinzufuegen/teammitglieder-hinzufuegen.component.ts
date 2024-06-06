import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from "@angular/common";
import { PlayerFormComponent } from "../player-form/player-form.component";
import { FormsModule } from "@angular/forms";
import {
  TeaminformationenBearbeitenComponent
} from "../teaminformationen-bearbeiten/teaminformationen-bearbeiten.component";
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../services/Team.service';

@Component({
  selector: 'app-teammitglieder-hinzufuegen',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, PlayerFormComponent, TeaminformationenBearbeitenComponent],
  templateUrl: './teammitglieder-hinzufuegen.component.html',
  styleUrls: ['./teammitglieder-hinzufuegen.component.css']
})
export class TeammitgliederHinzufuegenComponent implements OnInit {
  team = {
    teamId: 0,
    logo: 'assets/logo.png',
    name: ''
  };
  players: any[] = [];
  isPopupVisible = false;

  constructor(private route: ActivatedRoute, private teamService: TeamService) {
    this.teamService.playerWasAdded$.subscribe({
      next: _ => this.fetchPlayers(),
      error: err => alert("Error: " + err)
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.team.teamId = +params['id'];
      this.fetchTeam();
      this.fetchPlayers();
    });
  }

  fetchTeam() {
    this.teamService.getTeamById(this.team.teamId).subscribe(
      team => {
        this.team.name = team.name;
        this.team.logo = team.logo;
      },
      error => console.error('Error fetching team:', error)
    );
  }

  fetchPlayers() {
    this.teamService.getAllTeamPlayers(this.team.teamId).subscribe(
      players => {
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
      error => console.error('Error fetching players:', error)
    );
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
    const player = this.players[index];
    this.teamService.deletePlayer(this.team.teamId, player.id).subscribe(() => {
      this.players.splice(index, 1);
    });
  }

  closeList() {
    // Logic to close the player list
  }
}
