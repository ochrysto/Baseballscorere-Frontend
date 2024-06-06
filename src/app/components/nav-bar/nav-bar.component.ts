import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  template: `
    <div class="header">
      <a routerLink="/create-team">Neues Team anlegen</a>
      <a routerLink="/edit-team">Team bearbeiten</a>
      <button (click)="logout()">Log Out</button>
    </div>
  `,
  imports: [RouterLink],
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private keycloak: KeycloakService) {
  }

  public logout() {
    this.keycloak.logout().then(
      () => console.log('Successfully logged out.')  // TODO: Add confirmation?
    );
  }
}
