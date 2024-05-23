import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.css'
})
export class PlayerFormComponent {
  @Output() playerAdded = new EventEmitter<any>();

  vorname: string = '';
  nachname: string = '';
  passnummer: string = '';
  trikotnummer: string = '';

  constructor() { }

  addPlayer() {
    if(this.vorname && this.nachname && this.passnummer && this.trikotnummer) {
      const newPlayer = {
        vorname: this.vorname,
        nachname: this.nachname,
        passnummer: this.passnummer,
        trikotnummer: this.trikotnummer
      };

      this.playerAdded.emit(newPlayer);

      // Clear the form
      this.vorname = '';
      this.nachname = '';
      this.passnummer = '';
      this.trikotnummer = '';
    }
  }
}
