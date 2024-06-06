You are Senior JavaScript Angular Developer that know how to build robust and reusable frontend applications with Angular V17.
You know all best practices and write clean, well-documented code with SOLID, DRY and KISS principles in mind.

game-input.component.ts:
```typescript
import { Component, Input } from '@angular/core';
import { Button } from '../../models/button';
import { GamePageService } from '../../services/game-page.service';
import { ActionPost } from '../../models/action-post';
import { ActionsGet } from '../../models/actions-get';
import { GameGet } from '../../models/game-get';

@Component({
  selector: 'app-game-input',
  standalone: true,
  templateUrl: './game-input.component.html',
  styleUrl: './game-input.component.css'
})
export class GameInputComponent {
  @Input()
  get actions(): ActionsGet {
    return this._actions
  }

  set actions(actions: ActionsGet) {
    this._actions = actions;
    this.refreshButtons();
  }

  @Input()
  get game() {
    return this._game
  }

  set game(game: GameGet) {
    this._game = game
  }

  @Input()
  get base(): number {
    return this._base
  }

  set base(base: number) {
    this._base = base;
    this.refreshButtons();
  }


  buttonStack: any[][] = []; // Stack to keep track of button states for back navigation.
  _base: number = 1;
  _game!: GameGet;
  _actions!: ActionsGet;
  currentButtons: any; // Array to hold the currently displayed buttons.
  showBackButton: boolean = false; // Flag to control the visibility of the back button.

  constructor(private service: GamePageService) {}

  isButton(obj: any): obj is Button {
    return (
      typeof obj.button === 'string' &&
      typeof obj.actionType === 'string' &&
      typeof obj.responsibleRequired === 'boolean' &&
      typeof obj.multipleResponsibleRequired === 'boolean'
    );
  }


  refreshButtons() {
    let selectedButtons = null;
    switch (this._base) {
      case 0:
        selectedButtons = this.actions['batter'];
        break;
      case 1:
        selectedButtons = this.actions['firstBaseRunner'];
        break;
      case 2:
        selectedButtons = this.actions['secondBaseRunner'];
        break;
      case 3:
        selectedButtons = this.actions['thirdBaseRunner'];
    }
    this.currentButtons = selectedButtons;
  }


  /**
   * Handles button click events.
   * @param button The clicked button object.
   */
  handleButtonClick(button: any) {
    if (this.isButton(button)) {
      console.log('Tiefpunkt erreicht')
      // TODO: add logic for the buttons here
      let postData: ActionPost = {
        base: this.service.selectedBase.getValue(),
        distance: 0,
        type: button.actionType,
        responsible: []
      }

      if (!this._game.id) {
        console.error('Game id not found! Check `GamePageService`!')
        return;
      }

      this.service.postGameAction(this.game.id, postData).subscribe({
        next: (msg) => {
          console.log('Server response: ', msg)
        },
        error: (err) => {
          console.log('Error: ', err)
        }
      });
    } else {
      this.buttonStack.push(this.currentButtons);  // Push the current buttons to the button stack.
      this.currentButtons = this.currentButtons[button.button];  // Set the current buttons to the subbuttons of the clicked button.
      this.showBackButton = true;  // Show the back button.
    }
  }

  /**
   * Handles back button click event.
   */
  handleBack() {
    if (this.buttonStack.length > 0) {
      this.currentButtons = this.buttonStack.pop()!; // Pop the previous buttons from the button stack.
      this.showBackButton = this.buttonStack.length > 0; // Update the visibility of the back button.
    }
  }

  parseButtons(buttons: any) {
    if (buttons == null) {
      return [];
    }

    if (buttons instanceof Array) {
      return buttons
    } else {
      return Object.entries(buttons)
        .filter(v => v[1] !== null)
        .map(([key, _]) => {
          return {'button': key}
        });
    }
  }

  onConfirmation() {
    return null
  }

  undoSelection() {
    return null
  }
}
```

game-input.component.html:
```html
<div class="input-container">
  <div class="button-box-container">
    <div class="button-box">
      @if (showBackButton) {
      <button (click)="handleBack()" class="selectButton">Back</button>
      }
      @for (button of parseButtons(currentButtons); track button.button) {
      <button (click)="handleButtonClick(button)" class="selectButton">
        {{ button.button }}
      </button>
      } @empty {
      <p>select player</p>
      }
    </div>
  </div>

  <div class="confirmation-box">
    <button (click)="undoSelection()" class="undo">UNDO</button>
    <button (click)="onConfirmation()" class="ok">OK</button>
  </div>
</div>
```

ballpark.component.html:
```html
<div class="ballpark-component-container">
  <div class="ballpark-container">
    @if (gameState.team === "AWAY") {
    @for (player of homePlayers; track player) {
    <button class="defensive-player-home">
      {{ player.jerseyNr }}
      <span class="defensive-name-home">{{ player.lastname }}</span>
    </button>
    }
    @if (gameState.batter) {
    <button class="offensive-player-visitor-batter" [ngClass]="{'button-disabled' : actions.batter == null}"
            (click)="selectBase(0)">
      {{ gameState.batter!.jerseyNr }}
    </button>
    }
    @if (gameState.firstBase) {
    <button class="offensive-player-visitor-firstbase" [ngClass]="{'button-disabled' : actions.firstBaseRunner == null}"
            (click)="selectBase(1)">
      {{ gameState.firstBase!.jerseyNr }}
    </button>
    }
    @if (gameState.secondBase) {
    <button class="offensive-player-visitor-secondbase" [ngClass]="{'button-disabled' : actions.secondBaseRunner == null}"
            (click)="selectBase(2)">
      {{ gameState.secondBase!.jerseyNr }}
    </button>
    }
    @if (gameState.thirdBase) {
    <button class="offensive-player-visitor-thirdbase" [ngClass]="{'button-disabled' : actions.thirdBaseRunner == null}"
            (click)="selectBase(3)">
      {{ gameState.thirdBase!.jerseyNr }}
    </button>
    }
    }
    @if (gameState.team === "HOME") {
    @for (player of awayPlayers; track player) {
    <button class="defensive-player-visitor">
      {{ player.jerseyNr }}
      <span class="defensive-name-visitor">{{ player.lastname }}</span>
    </button>
    }
    @if (gameState.batter) {
    <button class="offensive-player-home-batter" [ngClass]="{'button-disabled' : actions.batter == null}">
      {{ gameState.batter!.jerseyNr }}
    </button>
    }
    @if (gameState.firstBase) {
    <button class="offensive-player-home-firstbase" [ngClass]="{'button-disabled' : actions.firstBaseRunner == null}">
      {{ gameState.firstBase!.jerseyNr }}
    </button>
    }
    @if (gameState.secondBase) {
    <button class="offensive-player-home-secondbase" [ngClass]="{'button-disabled' : actions.secondBaseRunner == null}">
      {{ gameState.secondBase!.jerseyNr }}
    </button>
    }
    @if (gameState.thirdBase) {
    <button class="offensive-player-home-thirdbase" [ngClass]="{'button-disabled' : actions.thirdBaseRunner == null}">
      {{ gameState.thirdBase!.jerseyNr }}
    </button>
    }
    }

    <img src="assets/ballpark.svg" class="ballpark" alt="missing Ballpark picture"/>
  </div>
</div>
```

ballpark.component.ts
```typescript
import { Component, Input, OnInit } from '@angular/core';
import { LineUpPlayers } from '../../models/line-up-players';
import { GamePageService } from '../../services/game-page.service';
import { NgClass } from '@angular/common';
import { GameStateGet } from '../../models/game-state-get';
import { ActionsGet } from '../../models/actions-get';

@Component({
  selector: 'app-game-ballpark',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './ballpark.component.html',
  styleUrl: './ballpark.component.css'
})
export class BallparkComponent implements OnInit {
  @Input()
  get gameState(): GameStateGet {
    return this._gameState
  }

  set gameState(gameState: GameStateGet) {
    this._gameState = gameState
  }

  @Input()
  get actions(): ActionsGet {
    return this._actions
  }

  set actions(actions: ActionsGet) {
    this._actions = actions
  }

  @Input()
  get homePlayers(): LineUpPlayers[] {
    return this._defensiveHomeTeam
  }

  set homePlayers(players: LineUpPlayers[]) {
    this._defensiveHomeTeam = [...players].sort((a, b) => a.position - b.position);
  }

  @Input()
  get awayPlayers(): LineUpPlayers[] {
    return this._defensiveGuestTeam
  }

  set awayPlayers(players: LineUpPlayers[]) {
    this._defensiveGuestTeam = [...players].sort((a, b) => a.position - b.position);
  }

  private _defensiveHomeTeam: LineUpPlayers[] = [];
  private _defensiveGuestTeam: LineUpPlayers[] = [];
  private _gameState!: GameStateGet;
  private _actions!: ActionsGet;

  constructor(protected service: GamePageService) {
  }

  ngOnInit() {
  }

  /**
   * selects the offensive player
   * @param number identifies the baseposition
   */
  selectBase(number: number) {
    this.service.selectedBase.next(number);
  }
}
```

game-page.components.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { BallparkComponent } from '../../components/game-ballpark/ballpark.component';
import { GameInputComponent } from '../../components/game-input/game-input.component';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { GamePageService } from '../../services/game-page.service';
import { GameGet } from '../../models/game-get';
import { GameStateGet } from '../../models/game-state-get';
import { OffensiveActionsGet } from '../../models/offensive-actions-get';
import { ActionsGet } from '../../models/actions-get';
import { LineUpPlayers } from '../../models/line-up-players';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
// [...] Other components go here
    BallparkComponent,
    GameInputComponent,
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit {
  public game!: GameGet;
  public gameState!: GameStateGet;
  public gameActions!: ActionsGet;
  public homePlayers: LineUpPlayers[] = [];
  public awayPlayers: LineUpPlayers[] = [];
  public visitorTeamDiamonds: OffensiveActionsGet[][] = [];
  public homeTeamDiamonds: OffensiveActionsGet[][] = [];
  public selectedBase: number = 0;


  constructor(private route: ActivatedRoute, private gameService: GameService, private service: GamePageService) {
    this.service.isChanged$.subscribe({
      next: value => this.refreshAllData(),
      error: err => console.error('Cannot refresh all data: ' + err)
    });

    this.service.isGameFetched$.subscribe({
      next: value => {
        this.refreshAllData();
        console.log('Successfully refreshed game data');
      },
      error: error => console.log('Cannot refresh game data: ' + error)
    });

    this.service.selectedBase$.subscribe({
      next: base => {
        this.selectedBase = base;
        console.log('Changed selected base to ' + base);
      }
    })
  }

  refreshAllData() {
    // update game state
    this.service.getGameState(this.game.id).subscribe({
      next: (state) => this.gameState = state,
      error: (err) => console.log('cannot get game state', err)
    });

    // update game actions
    this.service.getGameActions(this.game!.id).subscribe({
      next: actions => {
        this.gameActions = actions;
        console.log('Successfully fetched new actions from a backend');
      },
      error: error => console.log('Cannot refresh game data: ' + error)
    });

    // update game actions
    this.service.getGameActions(this.game!.id).subscribe({
      next: actions => {
        this.gameActions = actions;
        console.log('Successfully fetched new actions from a backend');
      },
      error: error => console.log('Cannot refresh game data: ' + error)
    });

    // Refresh diamonds on game change
    this.service.isChanged$.subscribe({
      next: value => {
        this.service.getGameDiamonds(this.game.id, 'AWAY').subscribe({
          next: diamonds => this.visitorTeamDiamonds = diamonds
        });
        this.service.getGameDiamonds(this.game.id, 'HOME').subscribe({
          next: diamonds => this.homeTeamDiamonds = diamonds
        });
      }
    });

    // update players
    this.homePlayers = this.service.getAllHomePlayers();
    this.awayPlayers = this.service.getAllGuestPlayer();
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const gameId = +params.get('id')!;
        return this.gameService.getGame(gameId);
      })
    ).subscribe(game => {
      this.game = game;
      this.refreshAllData();
    });
  }
}
```

game-page.component.html:
```html
<div class="grid-container">
<!--[...] Other components go here-->
  <div class="ballpark"><app-game-ballpark [gameState]="gameState" [homePlayers]="homePlayers" [awayPlayers]="awayPlayers" [actions]="gameActions"></app-game-ballpark></div>
  <div class="input"><app-game-input [actions]="gameActions" [base]="selectedBase" [game]="game"></app-game-input></div>
</div>
```

Task:
1. If the clicked button object (`handleButtonClick` method) has `responsibleRequired == true` we should be able to click at one and only one defencive player button in `ballpark.component.html`. 
After that we should add a clicked defencive position `e.g. SHORTSTOP` name to the `responsible` list of POST data. It should be only 1 position in this list! After that we should be able to click OK button from `game-input.component.html` and POST action. 
2. If the clicked button object (`handleButtonClick` method) has `responsibleRequired == true` and `multipleResponsibleRequired == true` we should be able to click at more than one defencive player button in `ballpark.component.html`. 
After that we should add a clicked defencive position `e.g. SHORTSTOP` names to the `responsible` list of POST data. It should be at least 2 positions in this list! After that we should be able to click OK button from `game-input.component.html` and POST action.
3. If the clicked button object has `responsibleRequired == false`, we POST the action.
