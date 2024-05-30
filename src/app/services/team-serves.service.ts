import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetTeam} from "../models/GetTeam";

@Injectable({
  providedIn: 'root'
})
export class TeamServesService {
  private baseUrl = 'https://lockalhost8080/team'  // base URL for the Employee backend API.

  constructor(private http: HttpClient) {
  }

  public getAllTeams(): any {
    return this.http.get<any[]>(this.baseUrl);
  }
}
