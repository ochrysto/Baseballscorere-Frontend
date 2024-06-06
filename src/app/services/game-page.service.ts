import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {OffensiveActionsGet} from '../models/offensive-actions-get';
import {HttpClient} from '@angular/common/http';
import {ActionsGet} from '../models/actions-get';
import {MessageGet} from '../models/message-get';
import {ActionPost} from '../models/action-post';
import {GameStateGet} from '../models/game-state-get';
import {GameGet} from '../models/game-get';
import {LineUpPlayerGet} from '../models/line-up-player-get';
import {Button} from "../models/button";

@Injectable({
  providedIn: 'root'
})
export class GamePageService {

  private baseUrl = 'http://localhost:8080';
  private defaultInningStatus: string = 'isTopInning';
  public gameIsOn = false;
  private inningStatusSubject = new BehaviorSubject<string>(this.defaultInningStatus);
  inningStatus$: Observable<string> = this.inningStatusSubject.asObservable();
  private selectedBase = new BehaviorSubject<number>(0);
  public selectedBase$: Observable<number> = this.selectedBase.asObservable();
  private isChanged = new BehaviorSubject<null>(null);
  public isChanged$: Observable<null> = this.isChanged.asObservable();
  private isGameFetched = new BehaviorSubject<boolean>(false);
  public isGameFetched$: Observable<boolean> = this.isGameFetched.asObservable();
  private selectedPlayers = new BehaviorSubject<number[]>([]);
  public selectedPlayers$: Observable<number[]> = this.selectedPlayers.asObservable();
  private selectedButton = new BehaviorSubject<Button | null>(null);
  public selectedButton$: Observable<Button | null> = this.selectedButton.asObservable();
  public game?: GameGet;


  constructor(private httpClient: HttpClient) {
  }

  /**
   * changes inningstatus from topinning to bottominning and vice versa in scoreboard component
   * @param inningStatus
   */
  setInningStatus(inningStatus: string) {
    this.inningStatusSubject.next(inningStatus);
  }

  getGameActions(gid: number) {
    const url = `${this.baseUrl}/game/${gid}/action`;
    return this.httpClient.get<ActionsGet>(url);
  }

  postGameAction(gid: number, data: ActionPost) {
    const url = `${this.baseUrl}/game/${gid}/action`;
    return this.httpClient.post<MessageGet>(url, data).pipe(tap({
      next: value => this.triggerChange()
    }));
  }

  getGameState(gid: number) {
    const url = `${this.baseUrl}/game/${gid}/state`;
    return this.httpClient.get<GameStateGet>(url);
  }

  /** Returns diamonds
   *
   * @param gid game id
   * @param team enum either AWAY or HOME
   */
  getGameDiamonds(gid: number, team: string) {
    const url = `${this.baseUrl}/game/${gid}/team/${team}/diamonds`;
    return this.httpClient.get<OffensiveActionsGet[][]>(url);
  }

  /** Returns a lineup of a defencive team
   *
   * @param gid game id
   * @param team enum either AWAY or HOME
   */
  getDefenciveTeamLineup(gid: number) {
    const url = `${this.baseUrl}/game/${gid}/defencive-team-state`;
    return this.httpClient.get<LineUpPlayerGet[]>(url);
  }

  public triggerChange() {
    console.log('Game change triggered')
    this.isChanged.next(null);
  }

  public toggleIsGameFetched() {
    this.isGameFetched.next(true);
  }

  updateSelectedBase(base: number) {
    this.selectedBase.next(base);
  }

  updateSelectedPlayers(players: number[]) {
    this.selectedPlayers.next(players);
  }

  clearSelectedPlayers() {
    this.selectedPlayers.next([]);
  }

  updateSelectedButton(button: Button) {
    this.selectedButton.next(button);
  }

  clearSelectedButton() {
    this.selectedButton.next(null);
  }
}
