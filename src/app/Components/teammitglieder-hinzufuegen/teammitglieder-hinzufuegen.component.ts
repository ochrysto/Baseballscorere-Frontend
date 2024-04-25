import {Component, OnInit} from '@angular/core';
import {CommonModule, NgFor} from "@angular/common";
import {PlayerFormComponent} from "../player-form/player-form.component";

@Component({
  selector: 'app-teammitglieder-hinzufuegen',
  standalone: true,
  imports: [CommonModule, NgFor, PlayerFormComponent],
  templateUrl: './teammitglieder-hinzufuegen.component.html',
  styleUrl: './teammitglieder-hinzufuegen.component.css'
})
export class TeammitgliederHinzufuegenComponent implements OnInit{
  team = {
    id: 1,
    logo: 'assets/logo.png', // replace with the path to your logo
    name: 'Bremen Dockers'
  };
  players: any[] = [
    { nr: '68', name: 'Luiz Koenig', passnummer: '40866' },
    { nr: '4', name: 'Stephan Schönebeck', passnummer: '46631' },
    { nr: '22', name: 'Melike Günther', passnummer: '87336' },
  ]; // This would be populated with actual player data

  constructor( ) {}

  ngOnInit() {}

  addPlayer(newPlayerData: any) {
    const newPlayer = {
      nr: this.players.length + 1, // or another logic to generate a unique number
      name: newPlayerData.vorname + ' ' + newPlayerData.nachname,
      passnummer: newPlayerData.passnummer
    };
    this.players.push(newPlayer);
  }

  modifyPlayer(index: number) {
    // Logic to modify a player
    console.log('Modify player', this.players[index]);
  }

  deletePlayer(index: number) {
    this.players.splice(index, 1);
  }

  closeList() {
    // Logic to close the player list, could be navigating back to the previous view or hiding this section
  }
}
