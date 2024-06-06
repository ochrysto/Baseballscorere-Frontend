import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';


/**
 * @deprecated
 */
interface Player {
    id: number;
    firstName: string;
    lastName: string;
    passnumber: number;
}

/**
 * @deprecated
 */
interface Team {
    teamId: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    private baseUrl = 'http://localhost:8080';
    private playerWasAdded: BehaviorSubject<null> = new BehaviorSubject<null>(null);
    public playerWasAdded$: Observable<null> = this.playerWasAdded.asObservable();
    constructor(private http: HttpClient) {}

    getLeagues(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/league`);
    }

    getClubs(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/club`);
    }

    getTeams(): Observable<Team[]> {
        return this.http.get<Team[]>(`${this.baseUrl}/team`);
    }
    getManagers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/manager`);
    }

    saveTeam(teamData: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/team`, teamData);
    }

    getAllPlayers(): Observable<Player[]> {
        return this.http.get<Player[]>(`${this.baseUrl}/player`);
    }

    addPlayersToTeam(teamId: number, playerIds: number[]): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/team/${teamId}/players`, playerIds);
    }

    getAllTeamPlayers(teamId: number): Observable<Player[]> {
      return this.http.get<Player[]>(`${this.baseUrl}/team/${teamId}/players`);
    }
  // Add deletePlayer method
  deletePlayer(teamid: number, playerId: number): Observable<any> {debugger;
    return this.http.delete(`${this.baseUrl}/team/${teamid}/${playerId}`);
  }

  // Add updatePlayer method
  updatePlayer(playerId: number, playerData: any): Observable<any> {debugger;
    return this.http.put(`${this.baseUrl}/player/${playerId}`, playerData);
  }

  triggerPlayersWasAdded() {
      this.playerWasAdded.next(null);
  }
}
