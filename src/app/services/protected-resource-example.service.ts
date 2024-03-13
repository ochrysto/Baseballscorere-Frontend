import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceExample } from '../models/resource-example';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProtectedResourceExampleService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  /**
   * @returns Observable<ResourceExample> - An observable containing dummy protected data.
   */
  getProtectedData(): Observable<ResourceExample> {
    const url = `${this.baseUrl}/protected`;
    return this.http.get<ResourceExample>(url);
  }
}
