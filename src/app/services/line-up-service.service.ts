import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../models/Team";


@Injectable({
  providedIn: 'root'
})
export class LineUpServiceService {
  private baseUrl: string = '';

  constructor(private http: HttpClient) { }

  public getAllPlayers(): Observable<Team[]> {
    return this.http.get<Team[]>(this.baseUrl);
  }

  public deliverLineUp(lineUpData: Team[]): Observable<Team[]> {
    console.log('Line Up was created');
    return this.http.post<Team[]>(this.baseUrl, lineUpData);
  }

  public updatePlayerById(id: number, lineUpData: Team[]): Observable<Team> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Team>(url, lineUpData);
  }

}
