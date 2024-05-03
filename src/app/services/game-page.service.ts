import {Injectable, Input, OnInit} from '@angular/core';
import {LineUpPlayers} from "../models/line-up-players";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GamePageService {

  public gameIsOn = false;


  private inningStatusSubject = new Subject<string>();
  inningStatus$: Observable<string> = this.inningStatusSubject.asObservable();

  setInningStatus(inningStatus: string) {
    this.inningStatusSubject.next(inningStatus);
  }

  constructor() {}

  protected visitorTeam: LineUpPlayers[] = [
    {
        battingOrder: 1,
        jerseyNumber: '36',
        firstname: 'Frank',
        lastname: 'Riermeister',
        position: 2,
        passNumber: 666382,
    },
    {
        battingOrder: 2,
        jerseyNumber: '9',
        firstname: 'Andre',
        lastname: 'Siener',
        position: 1,
        passNumber: 554932,
    },
    {
        battingOrder: 3,
        jerseyNumber: '3',
        firstname: "Matthias",
        lastname: "Gilde",
        position: 5,
        passNumber: 443926
    },
    {
        battingOrder: 4,
        jerseyNumber: '73',
        firstname: "Thorsten",
        lastname: "Laack",
        position: 6,
        passNumber: 546738
    },
    {
        battingOrder: 5,
        jerseyNumber: '12',
        firstname: "Peter",
        lastname: "Frank",
        position: 8,
        passNumber: 546389
    },
    {
        battingOrder: 6,
        jerseyNumber: '78',
        firstname: "Norbert",
        lastname: "Schwertner",
        position: 7,
        passNumber: 765449
    },
    {
        battingOrder: 7,
        jerseyNumber: '56',
        firstname: "Connie",
        lastname: "Ritter",
        position: 4,
        passNumber: 563722
    },
    {
        battingOrder: 8,
        jerseyNumber: '20',
        firstname: "Markus",
        lastname: "Kleininger",
        position: 9,
        passNumber: 964532
    },
    {
        battingOrder: 9,
        jerseyNumber: '39',
        firstname: "Steffen",
        lastname: "Sammert",
        position: 3,
        passNumber: 657486
    }
]

  protected homeTeam: LineUpPlayers[] = [
    {
      battingOrder: 1,
      jerseyNumber: '67',
      firstname: 'Hennes',
      lastname: 'Moser',
      position: 8,
      passNumber: 746493,
    },
    {
      battingOrder: 2,
      jerseyNumber: '10',
      firstname: 'Lutz',
      lastname: 'Dreher',
      position: 2,
      passNumber: 935449,
    },
    {
      battingOrder: 3,
      jerseyNumber: '34',
      firstname: "Peter",
      lastname: "Paukner",
      position: 6,
      passNumber: 548302
    },
    {
      battingOrder: 4,
      jerseyNumber: '88',
      firstname: "Hennes",
      lastname: "Geyer",
      position: 1,
      passNumber: 345250
    },
    {
      battingOrder: 5,
      jerseyNumber: '00',
      firstname: "Lenny",
      lastname: "Gerhardt",
      position: 7,
      passNumber: 600468
    },
    {
      battingOrder: 6,
      jerseyNumber: '25',
      firstname: "Mick",
      lastname: "Rapp",
      position: 4,
      passNumber: 552320
    },
    {
      battingOrder: 7,
      jerseyNumber: '42',
      firstname: "Jamie",
      lastname: "Tepper",
      position: 3,
      passNumber: 553725
    },
    {
      battingOrder: 8,
      jerseyNumber: '18',
      firstname: "Dilara",
      lastname: "Schirrmeister",
      position: 9,
      passNumber: 555382
    },
    {
      battingOrder: 9,
      jerseyNumber: '16',
      firstname: "Abdul",
      lastname: "Paschke",
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
}
