import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-umpire-create-form',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './umpire-create-form.component.html',
  styleUrl: './umpire-create-form.component.css'
})
export class UmpireCreateFormComponent {
  vorname: string = '';
  nachname: string = '';
  passnummer: string = '';

  onSubmit() {
    // handling the form submission logic, such as sending data to a server
    console.log('Form submitted with data:', { vorname: this.vorname, nachname: this.nachname, passnummer: this.passnummer });
  }
}
