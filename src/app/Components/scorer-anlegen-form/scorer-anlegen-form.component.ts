import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-scorer-anlegen-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './scorer-anlegen-form.component.html',
  styleUrl: './scorer-anlegen-form.component.css'
})
export class ScorerAnlegenFormComponent {
  vorname: string = '';
  nachname: string = '';
  passnummer: string = '';

  onSubmit() {
    // handling the form submission logic, such as sending data to a server
    console.log('Form submitted with data:', { vorname: this.vorname, nachname: this.nachname, passnummer: this.passnummer });
  }
}
