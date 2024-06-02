import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PositionGet} from "../models/position-get";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getPositions(): Observable<PositionGet[]> {
    return this.http.get<PositionGet[]>(this.baseUrl + `/positions`);
  }
}
