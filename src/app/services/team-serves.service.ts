import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TeamGet} from "../models/team-get";

@Injectable({
  providedIn: 'root'
})
export class TeamServesService {
  private baseUrl = 'http://localhost:8080/team'  // base URL for the Employee backend API.

  constructor(private http: HttpClient) {
  }

  public getAllTeams() {
    return this.http.get<TeamGet[]>(this.baseUrl);
  }
}
