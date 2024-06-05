import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-teaminformationen-bearbeiten',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './teaminformationen-bearbeiten.component.html',
  styleUrl: './teaminformationen-bearbeiten.component.css'
})
export class TeaminformationenBearbeitenComponent {
  @Output() close = new EventEmitter<void>();
  Verein_name: string = '';
  Teams_name: string = '';
  Manager: string = '';
  logo: File | null = null;
  Liga_Name: string = '';
  fileName: string = 'Keine Datei ausgewählt';
  ligaOptions = [
    { id: 1, name: 'La Liga' },
    { id: 2, name: 'Premier League' },
    { id: 3, name: 'Bundesliga' }
  ];
  vereinOptions = [
    { id: 1, name: 'Madrid' },
    { id: 2, name: 'Barcelone' },
    { id: 3, name: 'Bayern' }
  ];
  teamOptions = [
    { id: 1, name: 'Madrid 1' },
    { id: 2, name: 'Barcelone 2' },
    { id: 3, name: 'Bayern 3' }
  ];
  managerOptions = [
    { id: 1, name: 'Regragi' },
    { id: 2, name: 'Ancelotti' },
    { id: 3, name: 'Enrique' }
  ];
  constructor(private router: Router) {}

  onFileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.logo = fileList[0];
      this.fileName = this.logo.name; // Update the file name
    }
  }

  onSubmit() {
    // Prepare the form data for submission
    const formData = new FormData();
    formData.append('Liga_Name', this.Liga_Name);
    formData.append('Verein_name', this.Verein_name);
    formData.append('Teams_name', this.Teams_name);
    formData.append('Manager', this.Manager);
    if (this.logo) formData.append('Logo', this.logo, this.logo.name);

    console.log('Form submitted with data:', formData);
    // Handle the actual form submission logic here, such as sending the form data to a server
    // For the sake of this example, navigate to the team edit page with a dummy ID
    this.router.navigate(['/team_erstellen', 1]);
  }

  closePopup() {
    this.close.emit();
  }
}
