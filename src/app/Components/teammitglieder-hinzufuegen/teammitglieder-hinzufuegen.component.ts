import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from "@angular/common";
import { PlayerFormComponent } from "../player-form/player-form.component";
import { FormsModule } from "@angular/forms";
import {
  TeaminformationenBearbeitenComponent
} from "../teaminformationen-bearbeiten/teaminformationen-bearbeiten.component";
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../services/Team.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-teammitglieder-hinzufuegen',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, PlayerFormComponent, TeaminformationenBearbeitenComponent],
  templateUrl: './teammitglieder-hinzufuegen.component.html',
  styleUrls: ['./teammitglieder-hinzufuegen.component.css']
})
export class TeammitgliederHinzufuegenComponent implements OnInit {
  team = {
    id: 0,
    logo: 'assets/logo.png',
    name: 'Bremen Dockers'
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
    // Get the team ID from the URL
    this.route.params.subscribe(params => {
      this.team.id = +params['id']; // The '+' converts the string to a number
      this.fetchPlayers();
    });
  }

  fetchPlayers() {
    this.teamService.getAllTeamPlayers(this.team.id).subscribe(
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
    };debugger;
    this.teamService.updatePlayer(player.id, updatedPlayer).subscribe(() => {
      player.editing = false;
    });
  }

  deletePlayer(index: number) {debugger;
    const player = this.players[index];
    this.teamService.deletePlayer(this.team.id, player.id).subscribe(() => {
      this.players.splice(index, 1);
    });
  }

  closeList() {
    // Logic to close the player list, could be navigating back to the previous view or hiding this section
    // and return to main page of course
  }
}
