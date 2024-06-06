import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScorerGet } from '../models/scorer-get';

@Injectable({
  providedIn: 'root',
})
export class ScorerService {
  private baseUrl = 'http://localhost:8080/scorer'; // base URL for the Employee backend API.

  constructor(private http: HttpClient) {}

  public getAllScorers() {
    return this.http.get<ScorerGet[]>(this.baseUrl);
  }
}
