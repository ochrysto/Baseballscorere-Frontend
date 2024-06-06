import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerGet } from '../models/player-get';
import { LineUpPost } from '../models/line-up-post';
import { LineUpGet } from '../models/line-up-get';

@Injectable({
  providedIn: 'root',
})
export class LineUpService {
  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getPlayersByTeamId(teamId: number): Observable<PlayerGet[]> {
    return this.http.get<PlayerGet[]>(this.baseUrl + `/team/${teamId}/players`);
  }

  createLineUps(lineUp: LineUpPost[]): Observable<LineUpGet[]> {
    if (lineUp.length != 2) {
      console.warn('We must provide exactly 2 lineups! Check `line-up.component.ts` code.');
    }
    return this.http.post<LineUpGet[]>(this.baseUrl + '/lineup', lineUp);
  }
}
