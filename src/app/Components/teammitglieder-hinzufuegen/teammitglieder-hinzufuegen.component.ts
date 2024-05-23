import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from "@angular/common";
import { PlayerFormComponent } from "../player-form/player-form.component";
import { FormsModule } from "@angular/forms";
import {TeamErstellungsFormComponent} from "../team-erstellungs-form/team-erstellungs-form.component";
import {
  TeaminformationenBearbeitenComponent
} from "../teaminformationen-bearbeiten/teaminformationen-bearbeiten.component";

@Component({
  selector: 'app-teammitglieder-hinzufuegen',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, TeaminformationenBearbeitenComponent],
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
    { trikotnummer: '68', name: 'Luiz Koenig', passnummer: '40866', editing: false, originalName: '', originalPassnummer: '', originalTrikotnummer: '' },
    { trikotnummer: '4', name: 'Stephan Schönebeck', passnummer: '46631', editing: false, originalName: '', originalPassnummer: '', originalTrikotnummer: '' },
    { trikotnummer: '22', name: 'Melike Günther', passnummer: '87336', editing: false, originalName: '', originalPassnummer: '', originalTrikotnummer: '' },
  ]; // This would be populated with actual player data

  constructor() { }

  ngOnInit() { }

  addPlayer(newPlayerData: any) {
    const newPlayer = {
      trikotnummer: newPlayerData.trikotnummer, // or another logic to generate a unique number
      name: newPlayerData.vorname + ' ' + newPlayerData.nachname,
      passnummer: newPlayerData.passnummer,
      editing: false,
      originalName: '',
      originalPassnummer: '',
      originalTrikotnummer: ''
    };
    this.players.push(newPlayer);
  }

  toggleEdit(index: number) {
    const player = this.players[index];
    if (!player.editing) {
      // Store original values before editing
      player.originalName = player.name;
      player.originalPassnummer = player.passnummer;
      player.originalTrikotnummer = player.trikotnummer;
    } else {
      // Revert to original values on cancel
      player.name = player.originalName;
      player.passnummer = player.originalPassnummer;
      player.trikotnummer = player.originalTrikotnummer;
    }
    player.editing = !player.editing;
  }

  submitEdit(index: number) {
    const player = this.players[index];
    // Clear original values after saving
    player.originalName = '';
    player.originalPassnummer = '';
    player.originalTrikotnummer = '';
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
