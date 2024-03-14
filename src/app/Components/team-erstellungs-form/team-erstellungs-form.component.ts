import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-team-erstellungs-form',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './team-erstellungs-form.component.html',
  styleUrl: './team-erstellungs-form.component.css'
})
export class TeamErstellungsFormComponent {
  Verbands_name: string = '';
  Stadt_name: string = '';
  Teams_name: string = '';
  email: string = '';
  logo: File | null = null;

  onFileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.logo = fileList[0];
    }
  }

  onSubmit() {
    // Prepare the form data for submission
    const formData = new FormData();
    formData.append('Verbands_name', this.Verbands_name);
    formData.append('Stadt_name', this.Stadt_name);
    formData.append('Teams_name', this.Teams_name);
    formData.append('email', this.email);
    if (this.logo) formData.append('Logo', this.logo, this.logo.name);

    console.log('Form submitted with data:', formData);
    // Handle the actual form submission logic here, such as sending the form data to a server
  }
}
