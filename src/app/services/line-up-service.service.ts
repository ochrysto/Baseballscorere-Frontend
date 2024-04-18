import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LineUpPlayers} from "../models/line-up-players";


@Injectable({
  providedIn: 'root'
})
export class LineUpServiceService {
  private baseUrl: string = '';

  constructor(private http: HttpClient) { }

  public getAllPlayers(): Observable<LineUpPlayers[]> {
    return this.http.get<LineUpPlayers[]>(this.baseUrl);
  }

  public deliverLineUp(lineUpData: LineUpPlayers[]): Observable<LineUpPlayers[]> {
    console.log('Line Up was created');
    return this.http.post<LineUpPlayers[]>(this.baseUrl, lineUpData);
  }

  public updatePlayerById(id: number, lineUpData: LineUpPlayers[]): Observable<LineUpPlayers> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<LineUpPlayers>(url, lineUpData);
  }

}
