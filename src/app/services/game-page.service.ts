import {Injectable} from '@angular/core';
import {LineUpPlayers} from "../models/line-up-players";
import {BehaviorSubject, Observable} from "rxjs";
import {OffensiveActions} from "../models/offensiveActions";
import {ScoreBoardInning} from "../models/scoreBoardInning";
import {GameScore} from "../models/gameScore";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GamePageService {

  private baseUrl = 'http://localhost:8081';
  private defaultInningStatus: string = 'isTopInning';
  public gameIsOn = false;
  private inningStatusSubject = new BehaviorSubject<string>(this.defaultInningStatus);
  inningStatus$: Observable<string> = this.inningStatusSubject.asObservable();
  numberOfInnings: number = 9;


  constructor(private httpClient: HttpClient) {}

  /**
   * changes inningstatus from topinning to bottominning and vice versa in scoreboard component
   * @param inningStatus
   */
  setInningStatus(inningStatus: string) {
    this.inningStatusSubject.next(inningStatus);
  }


  /**
   * gets the fitting diamond for a certain hometeamplayer in a certain Inning in line-up component
   * @param playerName
   * @param inning
   */
  getHomeDiamondsByPlayer(playerName: string, inning: number) {
    return this.offensiveActionsHomeTeam.find(action =>
      action.name === playerName)?.offensiveActions.at(inning - 1);
  }
  /**
   * gets the fitting diamond for a certain guestteamplayer in a certain Inning in line-up component
   * @param playerName
   * @param inning
   */
  getGuestDiamondsByPlayer(playerName: string, inning: number) {
    return this.offensiveActionsGuestTeam.find(action =>
      action.name === playerName)?.offensiveActions.at(inning - 1);
  }

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
  protected offensiveActionsHomeTeam: OffensiveActions[] = [
    {
      name: 'Moser',
      passNumber: 1,
      offensiveActions: [
        {
          order: 1,
          base: 0,
          center: 'I',
          first: 'K',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 1,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 1,
          base: 4,
          center: '',
          first: '1B',
          second: '',
          third: '',
          home: 'X3',
          util: ''
        },
        {
          order: 1,
          base: 4,
          center: '',
          first: 'E2',
          second: 'X2',
          third: '',
          home: 'X3',
          util: ''
        },
        {
          order: 1,
          base: 0,
          center: 'II',
          first: 'F8',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 1,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 1,
          base: 2,
          center: '',
          first: 'E5',
          second: 'X2',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 1,
          base: 0,
          center: 'I',
          first: 'K',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 1,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    },
    {
      name: 'Dreher',
      passNumber: 2,
      offensiveActions: [
        {
          order: 2,
          base: 0,
          center: 'II',
          first: '1-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 2,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 2,
          base: 0,
          center: 'I',
          first: '•SF8',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 2,
          base: 4,
          center: '',
          first: 'BB',
          second: '',
          third: 'X3',
          home: 'X4',
          util: ''
        },
        {
          order: 2,
          base: 0,
          center: 'III',
          first: '2-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 2,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 2,
          base: 1,
          center: '',
          first: '•1B',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 2,
          base: 0,
          center: 'II',
          first: '1-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 2,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    },
    {
      name: 'Paukner',
      passNumber: 3,
      offensiveActions: [
        {
          order: 3,
          base: 1,
          center: 'III',
          first: '1B',
          second: '4-6',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 3,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 3,
          base: 4,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '••HR',
          util: ''
        },
        {
          order: 3,
          base: 1,
          center: 'II',
          first: '',
          second: '••2B',
          third: 'X4',
          home: '5-3-6',
          util: ''
        },
        {
          order: 3,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 3,
          base: 1,
          center: 'I',
          first: 'AP1-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 3,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 3,
          base: 1,
          center: 'III',
          first: '1B',
          second: '4-6',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 3,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    },
    {
      name: 'Geyer',
      passNumber: 4,
      offensiveActions: [
        {
          order: 4,
          base: 1,
          center: '',
          first: 'FC',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 4,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 4,
          base: 3,
          center: 'III',
          first: 'BB',
          second: 'WP5',
          third: 'X7',
          home: '9-3-2',
          util: ''
        },
        {
          order: 4,
          base: 4,
          center: '',
          first: '1B',
          second: 'X5',
          third: '',
          home: 'X6',
          util: ''
        },
        {
          order: 4,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 4,
          base: 3,
          center: '',
          first: 'BB',
          second: 'PKe1',
          third: 'X5',
          home: '',
          util: ''
        },
        {
          order: 4,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 4,
          base: 1,
          center: '',
          first: 'FC',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 4,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },

      ]
    },
    {
      name: 'Gerhardt',
      passNumber: 5,
      offensiveActions: [
        {
          order: 5,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 5,
          base: 1,
          center: 'I',
          first: '1B',
          second: 'DP 9-3',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 5,
          base: 0,
          center: 'II',
          first: '6-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 5,
          base: 3,
          center: '',
          first: 'FC',
          second: 'X6',
          third: 'SB7',
          home: '',
          util: ''
        },
        {
          order: 5,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 5,
          base: 0,
          center: 'II',
          first: 'SH1-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 5,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 5,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 5,
          base: 0,
          center: 'I',
          first: 'K',
          second: '',
          third: '',
          home: '',
          util: ''
        },
      ]
    },
    {
      name: 'Rapp',
      passNumber: 6,
      offensiveActions: [
        {
          order: 6,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 6,
          base: 0,
          center: 'II',
          first: 'DP F9',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 6,
          base: 3,
          center: '',
          first: 'IBB',
          second: '',
          third: 'X7',
          home: '',
          util: ''
        },
        {
          order: 6,
          base: 1,
          center: 'III',
          first: '•1B',
          second: 'CS 1-3-6',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 6,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 6,
          base: 0,
          center: 'III',
          first: 'F7',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 6,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 6,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 6,
          base: 0,
          center: 'II',
          first: '6-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
      ]
    },
    {
      name: 'Tepper',
      passNumber: 7,
      offensiveActions: [
        {
          order: 7,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 7,
          base: 2,
          center: '',
          first: 'HP',
          second: 'PB8',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 7,
          base: 2,
          center: '',
          first: '1B',
          second: 'FC',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 7,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 7,
          base: 0,
          center: 'LT',
          first: '',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 7,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 7,
          base: 0,
          center: 'I',
          first: '4-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 7,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 7,
          base: 1,
          center: 'III',
          first: '1B',
          second: 'CS2-4',
          third: '',
          home: '',
          util: ''
        },
      ]
    },
    {
      name: 'Schirrmeister',
      passNumber: 8,
      offensiveActions: [
        {
          order: 8,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 8,
          base: 0,
          center: 'III',
          first: 'U3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 8,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 8,
          base: 4,
          center: '',
          first: '1B',
          second: 'BK9',
          third: 'FC',
          home: 'X3',
          util: ''
        },
        {
          order: 8,
          base: 3,
          center: 'I',
          first: '',
          second: '2B',
          third: 'X9',
          home: '2-1',
          util: ''
        },
        {
          order: 8,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 8,
          base: 3,
          center: 'II',
          first: '1B',
          second: '',
          third: 'X9',
          home: 'CS2-6-2',
          util: ''
        },
        {
          order: 8,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 8,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    },
    {
      name: 'Paschke',
      passNumber: 9,
      offensiveActions: [
        {
          order: 9,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 9,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 9,
          base: 4,
          center: '',
          first: 'BB',
          second: 'SB1',
          third: 'X1',
          home: 'X2',
          util: ''
        },
        {
          order: 9,
          base: 0,
          center: 'I',
          first: 'K2-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 9,
          base: 2,
          center: '',
          first: 'SH3-E1',
          second: 'FC',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 9,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 9,
          base: 4,
          center: '',
          first: '1B',
          second: 'FC',
          third: '(E5)',
          home: 'X2',
          util: ''
        },
        {
          order: 9,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 9,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    }
  ]
  protected offensiveActionsGuestTeam: OffensiveActions[] = [
    {
      name: 'Riermeister',
      passNumber: 1,
      offensiveActions: [
        {
          order: 1,
          base: 0,
          center: 'I',
          first: '5-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 1,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 1,
          base: 4,
          center: '',
          first: '1B',
          second: '',
          third: 'X3',
          home: 'X4',
          util: ''
        },
        {
          order: 1,
          base: 2,
          center: '',
          first: 'IBB',
          second: 'X2',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 1,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 1,
          base: 1,
          center: 'II',
          first: 'SH E1',
          second: 'OBR U3',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 1,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 1,
          base: 0,
          center: 'I',
          first: 'K',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 1,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    },
    {
      name: 'Siener',
      passNumber: 2,
      offensiveActions: [
        {
          order: 2,
          base: 1,
          center: 'II',
          first: '1B',
          second: '3-6',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 2,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 2,
          base: 0,
          center: 'I',
          first: 'F5',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 2,
          base: 1,
          center: '',
          first: 'FC',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 2,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 2,
          base: 0,
          center: 'III',
          first: 'F7',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 2,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 2,
          base: 1,
          center: '',
          first: 'Fc',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 2,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    },
    {
      name: 'Gilde',
      passNumber: 3,
      offensiveActions: [
        {
          order: 3,
          base: 2,
          center: '',
          first: 'FC',
          second: 'e6',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 3,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 3,
          base: 4,
          center: '',
          first: '1B',
          second: '',
          third: '',
          home: 'X5',
          util: ''
        },
        {
          order: 3,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 3,
          base: 3,
          center: 'II',
          first: '1B',
          second: 'SB4',
          third: 'X5',
          home: '3-5-2',
          util: ''
        },
        {
          order: 3,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 3,
          base: 4,
          center: '',
          first: '',
          second: '2B',
          third: 'SB4',
          home: 'X5',
          util: ''
        },
        {
          order: 3,
          base: 0,
          center: 'III',
          first: 'F9',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 3,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    },
    {
      name: 'Laack',
      passNumber: 4,
      offensiveActions: [
        {
          order: 4,
          base: 0,
          center: 'III',
          first: '1-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 4,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 4,
          base: 0,
          center: 'II',
          first: '•SF8',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 4,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 4,
          base: 0,
          center: 'I',
          first: '6-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 4,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 4,
          base: 0,
          center: 'I',
          first: 'K',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 4,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 4,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },

      ]
    },
    {
      name: 'Frank',
      passNumber: 5,
      offensiveActions: [
        {
          order: 5,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 5,
          base: 3,
          center: '',
          first: 'BB',
          second: 'X6',
          third: 'X7',
          home: '',
          util: ''
        },
        {
          order: 5,
          base: 4,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '••HR',
          util: ''
        },
        {
          order: 5,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 5,
          base: 3,
          center: '',
          first: '1B',
          second: 'FC',
          third: '(E3)',
          home: '',
          util: ''
        },
        {
          order: 5,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 5,
          base: 4,
          center: '',
          first: '•1B',
          second: 'WP6',
          third: '',
          home: 'X6',
          util: ''
        },
        {
          order: 5,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 5,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    },
    {
      name: 'Schwertner',
      passNumber: 6,
      offensiveActions: [
        {
          order: 6,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 6,
          base: 1,
          center: 'II',
          first: 'HP',
          second: 'DP 9-3',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 6,
          base: 0,
          center: 'III',
          first: '4-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 6,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 6,
          base: 1,
          center: '',
          first: '6-E3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 6,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 6,
          base: 4,
          center: '',
          first: '',
          second: '',
          third: '•3B',
          home: 'PB8',
          util: ''
        },
        {
          order: 6,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 6,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    },
    {
      name: 'Ritter',
      passNumber: 7,
      offensiveActions: [
        {
          order: 7,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 7,
          base: 0,
          center: 'I',
          first: 'DP F9',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 7,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 7,
          base: 0,
          center: 'I',
          first: '6-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 7,
          base: 0,
          center: 'III',
          first: 'K',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 7,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 7,
          base: 0,
          center: 'II',
          first: 'F5',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 7,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 7,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    },
    {
      name: 'Kleininger',
      passNumber: 8,
      offensiveActions: [
        {
          order: 8,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 8,
          base: 1,
          center: '',
          first: 'BB',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 8,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 8,
          base: 2,
          center: 'I',
          first: '1B',
          second: 'X9',
          third: 'CS2-5',
          home: '',
          util: ''
        },
        {
          order: 8,
          base: 0,
          center: 'III',
          first: '6-3',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 8,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 8,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 8,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 8,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    },
    {
      name: 'Sammert',
      passNumber: 9,
      offensiveActions: [
        {
          order: 9,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 9,
          base: 0,
          center: 'III',
          first: 'F6',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 9,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 9,
          base: 0,
          center: 'II',
          first: 'SH1-4',
          second: '',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 9,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 9,
          base: 2,
          center: '',
          first: 'E5',
          second: 'X4',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 9,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
        {
          order: 9,
          base: 2,
          center: '',
          first: 'SH E2',
          second: 'X2',
          third: '',
          home: '',
          util: ''
        },
        {
          order: 9,
          base: 0,
          center: '',
          first: '',
          second: '',
          third: '',
          home: '',
          util: 'X'
        },
      ]
    }
  ]
  protected scoreBoardInnings: ScoreBoardInning[] = [
    {
      inningNumber: 1,
      guestScore: '1',
      homeScore: '3',
    },
    {
      inningNumber: 2,
      guestScore: '0',
      homeScore: '2',
    },
    {
      inningNumber: 3,
      guestScore: '0',
      homeScore: '1',
    },
    {
      inningNumber: 4,
      guestScore: '4',
      homeScore: '0',
    },
    {
      inningNumber: 5,
      guestScore: '0',
      homeScore: '0',
    },
    {
      inningNumber: 6,
      guestScore: '1',
      homeScore: '1',
    },
    {
      inningNumber: 7,
      guestScore: '2',
      homeScore: '0',
    },
    {
      inningNumber: 8,
      guestScore: '0',
      homeScore: '0',
    },
    {
      inningNumber: 9,
      guestScore: '1',
      homeScore: '0',
    },
  ]
  protected gameScore: GameScore =
    {
      guestTeamRuns: 9,
      homeTeamRuns: 4,
      guestTeamHits: 8,
      homeTeamHits: 7,
      guestTeamErrors: 0,
      homeTeamErrors: 3,
      guestTeamLobs: 10,
      homeTeamLobs: 12,
      currentInning: 6,
      topOrBottom: 'Top',
      outs: 1,
    }
  ;

  getAllGuestPlayer() {
    return this.visitorTeam;
  }

  getAllHomePlayers() {
    return this.homeTeam;
  }

  getGameScore() {
    return this.gameScore;
  }

  getScoreBoardInnings() {
    return this.scoreBoardInnings;
  }

}
