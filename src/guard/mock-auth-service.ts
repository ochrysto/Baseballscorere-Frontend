import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockAuthService {
  isAuthenticated() {
    return true; // always logged in
  }

  login(): void {
    // no redirect necessary
    console.log('Mock login');
  }
}
