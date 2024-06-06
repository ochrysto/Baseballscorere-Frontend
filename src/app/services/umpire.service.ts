import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UmpireGet } from '../models/umpire-get';

@Injectable({
  providedIn: 'root',
})
export class UmpireService {
  private baseUrl = 'http://localhost:8080/umpire'; // base URL for the Employee backend API.

  constructor(private http: HttpClient) {}

  public getAllUmpires() {
    return this.http.get<UmpireGet[]>(this.baseUrl);
  }
}
