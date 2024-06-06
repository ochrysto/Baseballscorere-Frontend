import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from "@angular/common";
import { PlayerFormComponent } from "../player-form/player-form.component";
import { FormsModule } from "@angular/forms";
import {
  TeaminformationenBearbeitenComponent
} from "../teaminformationen-bearbeiten/teaminformationen-bearbeiten.component";

@Component({
  selector: 'app-teammitglieder-hinzufuegen',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, PlayerFormComponent, TeaminformationenBearbeitenComponent],
  templateUrl: './teammitglieder-hinzufuegen.component.html',
  styleUrls: ['./teammitglieder-hinzufuegen.component.css']
})
export class TeammitgliederHinzufuegenComponent implements OnInit {
  team = {
    id: 1,
    logo: 'assets/logo.png', // replace with the path to your logo
    name: 'Bremen Dockers'
  };
  players: any[] = [
    { Vorname: 'Luiz', Nachname: 'Koenig', passnummer: '40866', editing: false, originalNachname: '', originalPassnummer: '', originalVorname: '' },
    { Vorname: 'Stephan', Nachname: 'Schönebeck', passnummer: '46631', editing: false, originalNachname: '', originalPassnummer: '', originalVorname: '' },
    { Vorname: 'Melike', Nachname: 'Günther', passnummer: '87336', editing: false, originalNachname: '', originalPassnummer: '', originalVorname: '' },
  ]; // This would be populated with actual player data

  isPopupVisible = false;

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }
  constructor() { }

  ngOnInit() { }

  addPlayer(newPlayerData: any) {
    const newPlayer = {
      Vorname: newPlayerData.Vorname, // or another logic to generate a unique number
      Nachname: newPlayerData.vorname + ' ' + newPlayerData.nachname,
      passnummer: newPlayerData.passnummer,
      editing: false,
      originalNachname: '',
      originalPassnummer: '',
      originalVorname: ''
    };
    this.players.push(newPlayer);
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
    // Clear original values after saving
    player.originalNachname = '';
    player.originalPassnummer = '';
    player.originalVorname = '';
    player.editing = false;
  }

  deletePlayer(index: number) {
    this.players.splice(index, 1);
  }

  closeList() {
    // Logic to close the player list, could be navigating back to the previous view or hiding this section
    // and return to main page of course
  }
}
