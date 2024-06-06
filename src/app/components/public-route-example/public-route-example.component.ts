import { Component } from '@angular/core';
import { ProtectedResourceExampleService } from '../../services/protected-resource-example.service';
import { PublicResourceExampleService } from '../../services/public-resource-example.service';

@Component({
  selector: 'app-public-route-example',
  standalone: true,
  imports: [],
  template: `
    <p>public-route-example works!</p>
    <button (click)="makePublicGetRequest()">Call public resource</button>
    <button (click)="makeProtectedGetRequest()">Call protected resource</button>
  `,
})
export class PublicRouteExampleComponent {
  constructor(
    private publicService: PublicResourceExampleService,
    private protectedService: ProtectedResourceExampleService
  ) {}

  /**
   * Test call to public endpoint
   */
  makePublicGetRequest() {
    this.publicService.getPublicData().subscribe({
      next: (response) => {
        //Erfolgreiche Verarbeitung der gespeicherten Daten
        console.log('Offene daten erfolgreich empfangen.');
        console.log('Empfangener text: ', response.text);
      },
      error: (error) => {
        //Fehlerbehandlung bei Speicherfehler
        console.error('Offene daten konnten nicht empfangen werden: ', error);
      },
    });
  }

  /**
   * Test call to protected endpoint
   */
  makeProtectedGetRequest() {
    this.protectedService.getProtectedData().subscribe({
      next: (response) => {
        //Erfolgreiche Verarbeitung der gespeicherten Daten
        console.log('Gesicherte daten erfolgreich empfangen.');
        console.log('Empfangener text: ', response.text);
      },
      error: (error) => {
        //Fehlerbehandlung bei Speicherfehler
        console.error('Gesicherte daten konnten nicht empfangen werden: ', error);
      },
    });
  }
}
