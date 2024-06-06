import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css',
})
export class LogoutButtonComponent {
  constructor(private keycloak: KeycloakService) {}

  logOut() {
    this.keycloak.logout().then(
      () => console.log('Successfully logged out.') // TODO: connect to KeycloakService
    );
  }
}
