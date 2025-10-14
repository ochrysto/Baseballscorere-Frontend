import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WrapUpGeneralData } from '../models/wrap-up-general-data';

@Injectable({
  providedIn: 'root',
})
export class WrapUpService {
  constructor(private httpClient: HttpClient) {}

  /**
  gets testdata from testfile
  TODO connect to backend
   */
  getGeneralData(): Observable<WrapUpGeneralData> {
    const url = 'assets/testdata/general-data.json';
    return this.httpClient.get<WrapUpGeneralData>(url);
  }
}
