import { Injectable } from '@angular/core';
import { LineUpPlayers } from '../models/line-up-players';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OffensiveActionsGet } from '../models/offensive-actions-get';
import { HttpClient } from '@angular/common/http';
import { ActionsGet } from '../models/actions-get';
import { MessageGet } from '../models/message-get';
import { ActionPost } from '../models/action-post';
import { GameStateGet } from '../models/game-state-get';
import { GameGet } from '../models/game-get';

@Injectable({
  providedIn: 'root'
})
export class GamePageService {

  private baseUrl = 'http://localhost:8080';
  private defaultInningStatus: string = 'isTopInning';
  public gameIsOn = false;
  private inningStatusSubject = new BehaviorSubject<string>(this.defaultInningStatus);
  inningStatus$: Observable<string> = this.inningStatusSubject.asObservable();
  public selectedBase = new BehaviorSubject<number>(0);
  public selectedBase$: Observable<number> = this.selectedBase.asObservable();
  public isChanged = new BehaviorSubject<null>(null);
  public isChanged$: Observable<null> = this.isChanged.asObservable();
  public isGameFetched = new BehaviorSubject<boolean>(false);
  public isGameFetched$: Observable<boolean> = this.isGameFetched.asObservable();
  public selectedPlayers = new BehaviorSubject<number[]>([]);
  public selectedPlayers$: Observable<number[]> = this.selectedPlayers.asObservable();
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

  //dummy lists before backend connection
  protected visitorTeam: LineUpPlayers[] = [
    {
      battingOrder: 1,
      jerseyNr: '36',
      firstname: 'Frank',
      lastname: 'Riermeister',
      position: 2,
      passNumber: 666382
    },
    {
      battingOrder: 2,
      jerseyNr: '9',
      firstname: 'Andre',
      lastname: 'Siener',
      position: 1,
      passNumber: 554932
    },
    {
      battingOrder: 3,
      jerseyNr: '3',
      firstname: 'Matthias',
      lastname: 'Gilde',
      position: 5,
      passNumber: 443926
    },
    {
      battingOrder: 4,
      jerseyNr: '73',
      firstname: 'Thorsten',
      lastname: 'Laack',
      position: 6,
      passNumber: 546738
    },
    {
      battingOrder: 5,
      jerseyNr: '12',
      firstname: 'Peter',
      lastname: 'Frank',
      position: 8,
      passNumber: 546389
    },
    {
      battingOrder: 6,
      jerseyNr: '78',
      firstname: 'Norbert',
      lastname: 'Schwertner',
      position: 7,
      passNumber: 765449
    },
    {
      battingOrder: 7,
      jerseyNr: '56',
      firstname: 'Connie',
      lastname: 'Ritter',
      position: 4,
      passNumber: 563722
    },
    {
      battingOrder: 8,
      jerseyNr: '20',
      firstname: 'Markus',
      lastname: 'Kleininger',
      position: 9,
      passNumber: 964532
    },
    {
      battingOrder: 9,
      jerseyNr: '39',
      firstname: 'Steffen',
      lastname: 'Sammert',
      position: 3,
      passNumber: 657486
    }
  ]
  protected homeTeam: LineUpPlayers[] = [
    {
      battingOrder: 1,
      jerseyNr: '67',
      firstname: 'Hennes',
      lastname: 'Moser',
      position: 8,
      passNumber: 746493
    },
    {
      battingOrder: 2,
      jerseyNr: '10',
      firstname: 'Lutz',
      lastname: 'Dreher',
      position: 2,
      passNumber: 935449
    },
    {
      battingOrder: 3,
      jerseyNr: '34',
      firstname: 'Peter',
      lastname: 'Paukner',
      position: 6,
      passNumber: 548302
    },
    {
      battingOrder: 4,
      jerseyNr: '88',
      firstname: 'Hennes',
      lastname: 'Geyer',
      position: 1,
      passNumber: 345250
    },
    {
      battingOrder: 5,
      jerseyNr: '00',
      firstname: 'Lenny',
      lastname: 'Gerhardt',
      position: 7,
      passNumber: 600468
    },
    {
      battingOrder: 6,
      jerseyNr: '25',
      firstname: 'Mick',
      lastname: 'Rapp',
      position: 4,
      passNumber: 552320
    },
    {
      battingOrder: 7,
      jerseyNr: '42',
      firstname: 'Jamie',
      lastname: 'Tepper',
      position: 3,
      passNumber: 553725
    },
    {
      battingOrder: 8,
      jerseyNr: '18',
      firstname: 'Dilara',
      lastname: 'Schirrmeister',
      position: 9,
      passNumber: 555382
    },
    {
      battingOrder: 9,
      jerseyNr: '16',
      firstname: 'Abdul',
      lastname: 'Paschke',
      position: 5,
      passNumber: 546372
    }
  ]

  getAllGuestPlayer() {
    return this.visitorTeam;
  }

  getAllHomePlayers() {
    return this.homeTeam;
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

  public triggerChange() {
    console.log('Game change triggered')
    this.isChanged.next(null);
  }

  public toggleIsGameFetched() {
    this.isGameFetched.next(true);
  }

  updateSelectedPlayers(players: number[]) {
    this.selectedPlayers.next(players);
  }
}
