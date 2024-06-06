import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TeamPost} from '../models/team-post';
import {TeamGet} from '../models/team-get';
import {ClubGet} from '../models/club-get';
import {ManagerGet} from '../models/manager-get';
import {LeagueGet} from '../models/league-get';
import {PlayerGet} from "../models/player-get";


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = 'http://localhost:8080';
  private playerWasAdded: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  public playerWasAdded$: Observable<null> = this.playerWasAdded.asObservable();
  private teamWasUpdated: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  public teamWasUpdated$: Observable<null> = this.teamWasUpdated.asObservable();

  constructor(private http: HttpClient) {
  }

  getLeagues(): Observable<LeagueGet[]> {
    return this.http.get<LeagueGet[]>(`${this.baseUrl}/league`);
  }

  getClubs(): Observable<ClubGet[]> {
    return this.http.get<ClubGet[]>(`${this.baseUrl}/club`);
  }

  getManagers(): Observable<ManagerGet[]> {
    return this.http.get<ManagerGet[]>(`${this.baseUrl}/manager`);
  }

  saveTeam(teamData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/team`, teamData);
  }

  getAllPlayers(): Observable<PlayerGet[]> {
    return this.http.get<PlayerGet[]>(`${this.baseUrl}/player`);
  }

  addPlayersToTeam(teamId: number, playerIds: number[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/team/${teamId}/players`, playerIds);
  }

  getAllTeamPlayers(teamId: number): Observable<PlayerGet[]> {
    return this.http.get<PlayerGet[]>(`${this.baseUrl}/team/${teamId}/players`);
  }

  deletePlayer(teamid: number, playerId: number): Observable<any> {
    debugger;
    return this.http.delete(`${this.baseUrl}/team/${teamid}/${playerId}`);
  }

  updatePlayer(playerId: number, playerData: any): Observable<any> {
    debugger;
    return this.http.put(`${this.baseUrl}/player/${playerId}`, playerData);
  }

  triggerPlayersWasAdded() {
    this.playerWasAdded.next(null);
  }

  triggerTeamWasUpdated() {
    this.teamWasUpdated.next(null);
  }

  updateTeam(teamId: number, data: TeamPost) {
    return this.http.put<TeamGet>(`${this.baseUrl}/team/${teamId}`, data);
  }

  getTeam(id: number) {
    return this.http.get<TeamGet>(`${this.baseUrl}/team/${id}`);
  }

  public getAllTeams() {
    return this.http.get<TeamGet[]>(`${this.baseUrl}/team`);
  }
}
