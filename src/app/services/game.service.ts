import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GameGet} from "../models/game-get";
import {GamePost} from "../models/game-post";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8080/game'  // base URL for the Employee backend API.

  constructor(private http: HttpClient) {}

  public postGame(gameData: GamePost) {
    return this.http.post<GameGet>(this.baseUrl, gameData);
  }
}
