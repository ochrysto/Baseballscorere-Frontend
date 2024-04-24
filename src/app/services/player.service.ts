import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private callSubject = new BehaviorSubject<string[]>([]);
  private _call: string[] = [];
  private _score: string = '';

  constructor() {}

  /**
   * checks if value is a combined value
   * if so it separates the first character to make it switchable
   * then it returns the
   * @param value the score from button component
   */
  set score(value: string) {
    if (/^[FUE]\d+$/.test(value)) {
      // regex checks if First letter is a F, U, E or e is, followed by any number
      this._score = value.charAt(0);
    } else if (/^OBR/.test(value)) {
      this._score = value.slice(0, 3); //checks if first three letters are OBR and then slice them off
    } else if (/^[0-9]-[Ee]\d+$/.test(value)) {
      this._score = 'A-E'; //checks if value begins with a number followed by a hyphen an an E or e
    } else if (/^[0-9-][^A-Z]/.test(value)) {
      this._score = 'GO'; //checks if value begins with a number and contains no letter
    } else {
      this._score = value;
    }
    switch (this._score) {
      case '1B':
        this.callSubject.next(['', '1B', '', '', '', '1']);
        break;
      case '2B':
        this.callSubject.next(['', '', '2B', '', '', '2']);
        break;
      case '3B':
        this.callSubject.next(['', '', '', '3B', '', '3']);
        break;
      case 'HR':
        this.callSubject.next(['', '', '', '', 'HR•', '4']);
        break;
      case 'BB':
        this.callSubject.next(['', 'BB', '', '', '', '1']);
        break;
      case 'HP':
        this.callSubject.next(['', 'HP', '', '', '', '1']);
        break;
      case 'LT':
        this.callSubject.next(['LT', '', '', '', '', '']);
        break;
      case 'FC':
        this.callSubject.next(['', 'FC', '', '', '', '1']);
        break;
      case 'K':
        this.callSubject.next(['I', 'K', '', '', '', '']);
        break;
      case 'KPB':
        this.callSubject.next(['', 'KPB', '', '', '', '1']);
        break;
      case 'K2-3':
        this.callSubject.next(['I', 'K2-3', '', '', '', '']);
        break;
      case 'CIe2':
        this.callSubject.next(['', 'CIe2', '', '', '', '1']);
        break;
      case 'F':
      case 'U':
      case 'GO':
      case 'OBR':
        this.callSubject.next(['I', value, '', '', '', '']);
        break;
      case 'E':
      case 'A-E':
        this.callSubject.next(['', value, '', '', '', '1']);
        break;
      default:
        this.callSubject.next([]);
    }
  }

  onChange() {}

  get call(): Observable<string[]> {
    return this.callSubject.asObservable();
  }
}

