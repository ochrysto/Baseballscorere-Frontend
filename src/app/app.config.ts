import { APP_INITIALIZER, ApplicationConfig, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';

/**
 * Reference from doc: https://github.com/mauriciovigolo/keycloak-angular?tab=readme-ov-file#setup
 * @param keycloak
 */
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/',  // URL of the Keycloak server
        realm: 'BaseballScoresheet',
        clientId: 'login-app'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: []  // URLs excluded from Bearer token addition
    });
}

/**
 * Provider for Keycloak Bearer Interceptor
 * About HTTP interceptors: https://angular.io/guide/http-intercept-requests-and-responses
 */
const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
};

/**
 * Provider for Keycloak Initialization
 * About APP_INITIALIZER: https://angular.io/api/core/APP_INITIALIZER#description
 */
const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService]
}

/**
 * Exported configuration for the application
 * Reference: https://github.com/mauriciovigolo/keycloak-angular/issues/535
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Provides HttpClient with interceptors
    KeycloakInitializerProvider, // Initializes Keycloak
    KeycloakBearerInterceptorProvider, // Provides Keycloak Bearer Interceptor
    KeycloakService, // Service for Keycloak
    provideRouter(routes) // Provides routing for the application
  ]
};
