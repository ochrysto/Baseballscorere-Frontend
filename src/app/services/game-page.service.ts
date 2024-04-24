import { Injectable } from '@angular/core';
import {LineUpPlayers} from "../models/line-up-players";

@Injectable({
  providedIn: 'root'
})
export class GamePageService {

  constructor() { }

  protected visitorTeam: LineUpPlayers[] = [
    {
        battingOrder: 1,
        jerseyNumber: '36',
        firstname: 'Frank',
        lastname: 'Riermeister',
        position: 'C',
        passNumber: 666382,
    },
    {
        battingOrder: 2,
         jerseyNumber: '9',
        firstname: 'Andre',
        lastname: 'Siener',
        position: 'P',
        passNumber: 554932,
    },
    {
        battingOrder: 3,
         jerseyNumber: '3',
        firstname: "Matthias",
        lastname: "Gilde",
        position: "3B",
        passNumber: 443926
    },
    {
        battingOrder: 4,
         jerseyNumber: '73',
        firstname: "Thorsten",
        lastname: "Laack",
        position: "SS",
        passNumber: 546738
    },
    {
        battingOrder: 5,
         jerseyNumber: '12',
        firstname: "Peter",
        lastname: "Frank",
        position: "CF",
        passNumber: 546389
    },
    {
        battingOrder: 6,
         jerseyNumber: '78',
        firstname: "Norbert",
        lastname: "Schwertner",
        position: "LF",
        passNumber: 765449
    },
    {
        battingOrder: 7,
         jerseyNumber: '56',
        firstname: "Connie",
        lastname: "Ritter",
        position: "2B",
        passNumber: 563722
    },
    {
        battingOrder: 8,
         jerseyNumber: '20',
        firstname: "Markus",
        lastname: "Kleininger",
        position: "RF",
        passNumber: 964532
    },
    {
        battingOrder: 9,
         jerseyNumber: '39',
        firstname: "Steffen",
        lastname: "Sammert",
        position: "1B",
        passNumber: 657486
    }
]

  protected homeTeam: LineUpPlayers[] = [
    {
      battingOrder: 1,
      jerseyNumber: '67',
      firstname: 'Hennes',
      lastname: 'Moser',
      position: 'CF',
      passNumber: 746493,
    },
    {
      battingOrder: 2,
      jerseyNumber: '10',
      firstname: 'Lutz',
      lastname: 'Dreher',
      position: 'C',
      passNumber: 935449,
    },
    {
      battingOrder: 3,
      jerseyNumber: '34',
      firstname: "Peter",
      lastname: "Paukner",
      position: "SS",
      passNumber: 548302
    },
    {
      battingOrder: 4,
      jerseyNumber: '88',
      firstname: "Hennes",
      lastname: "Geyer",
      position: "P",
      passNumber: 345250
    },
    {
      battingOrder: 5,
      jerseyNumber: '00',
      firstname: "Lenny",
      lastname: "Gerhardt",
      position: "LF",
      passNumber: 600468
    },
    {
      battingOrder: 6,
      jerseyNumber: '25',
      firstname: "Mick",
      lastname: "Rapp",
      position: "2B",
      passNumber: 552320
    },
    {
      battingOrder: 7,
      jerseyNumber: '42',
      firstname: "Jamie",
      lastname: "Tepper",
      position: "1B",
      passNumber: 553725
    },
    {
      battingOrder: 8,
      jerseyNumber: '18',
      firstname: "Dilara",
      lastname: "Schirrmeister",
      position: "RF",
      passNumber: 555382
    },
    {
      battingOrder: 9,
      jerseyNumber: '16',
      firstname: "Abdul",
      lastname: "Paschke",
      position: "3B",
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
