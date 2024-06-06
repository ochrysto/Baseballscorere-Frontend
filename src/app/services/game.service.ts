import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameGet } from '../models/game-get';
import { GamePost } from '../models/game-post';
import { Observable } from 'rxjs';
import { MessageGet } from '../models/message-get';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl = 'http://localhost:8080'; // base URL for the Employee backend API.

  constructor(private http: HttpClient) {}

  public postGame(gameData: GamePost) {
    return this.http.post<GameGet>(this.baseUrl + '/game', gameData);
  }

  public createFirstTurn(gameId: number) {
    return this.http.post<MessageGet>(this.baseUrl + '/game/' + gameId + '/turn', {});
  }

  getGame(gameId: number): Observable<GameGet> {
    return this.http.get<GameGet>(this.baseUrl + '/game/' + gameId);
  }
}
