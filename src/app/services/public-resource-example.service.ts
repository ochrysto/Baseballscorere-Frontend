import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceExample } from '../models/resource-example';

@Injectable({
  providedIn: 'root',
})
export class PublicResourceExampleService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  /**
   * @returns Observable<ResourceExample> - An observable containing dummy public data.
   */
  getPublicData(): Observable<ResourceExample> {
    const url = `${this.baseUrl}/public`;
    return this.http.get<ResourceExample>(url);
  }
}
