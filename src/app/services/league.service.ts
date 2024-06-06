import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LeagueGet} from "../models/league-get";

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private baseUrl = 'http://localhost:8080/league'  // base URL for the Employee backend API.

  constructor(private http: HttpClient) {}

  public getAllLeagues() {
    return this.http.get<LeagueGet[]>(this.baseUrl);
  }
}
