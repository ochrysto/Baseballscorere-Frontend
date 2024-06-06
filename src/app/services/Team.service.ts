import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

interface Player {
    id: number;
    firstName: string;
    lastName: string;
    passnumber: number;
}

interface Team {
    teamId: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    private baseUrl = 'http://localhost:8080';

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
}
