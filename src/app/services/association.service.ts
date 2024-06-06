import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssociationGet } from '../models/association-get';

@Injectable({
  providedIn: 'root',
})
export class AssociationService {
  private baseUrl = 'http://localhost:8080/association'; // base URL for the Employee backend API.

  constructor(private http: HttpClient) {}

  public getAllAssociations() {
    return this.http.get<AssociationGet[]>(this.baseUrl);
  }
}
