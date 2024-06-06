import {Component, Input} from '@angular/core';
import {Button} from '../../models/button';
import {GamePageService} from '../../services/game-page.service';
import {ActionPost} from '../../models/action-post';
import {ActionsGet} from '../../models/actions-get';
import {GameGet} from '../../models/game-get';
import {Responsible} from '../../models/responsible';
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-game-input',
  standalone: true,
  templateUrl: './game-input.component.html',
  styleUrl: './game-input.component.css'
})
export class GameInputComponent {
  @Input()
  get actions(): ActionsGet {
    return this._actions;
  }

  set actions(actions: ActionsGet) {
    this._actions = actions;
    this.refreshButtons();
  }

  @Input()
  get game() {
    return this._game;
  }

  set game(game: GameGet) {
    this._game = game;
  }

  @Input()
  get base(): number {
    return this._base;
  }

  set base(base: number) {
    this._base = base;
    this.refreshButtons();
  }

  @Input()
  // get responsible(): number[] {
  //   return this._base;
  // }
  set responsible(responsible: number[]) {
    this.selectedResponsiblePlayers = responsible;
  }

  private buttonStack: any[][] = []; // Stack to keep track of button states for back navigation.
  private _base: number = 1;
  private _game!: GameGet;
  private _actions!: ActionsGet;
  private _distance: number = 0;
  protected currentButtons: any; // Array to hold the currently displayed buttons.
  protected showBackButton: boolean = false; // Flag to control the visibility of the back button.
  private selectedButton: Button | null = null; // Store the currently selected button
  private selectedResponsiblePlayers: number[] = []; // Store the selected defensive player positions

  constructor(private service: GamePageService) {
  }

  isButton(obj: any): obj is Button {
    return (
      typeof obj.button === 'string' &&
      typeof obj.actionType === 'string' &&
      typeof obj.responsibleRequired === 'boolean' &&
      typeof obj.multipleResponsibleRequired === 'boolean'
    );
  }

  isDestination(obj: any): boolean {
    return (
      obj.button == 'firstBase' ||
      obj.button == 'secondBase' ||
      obj.button == 'thirdBase' ||
      obj.button == 'homeBase');
  }

  calculateDistance(destination: string): number {
    switch (destination) {
      case 'firstBase':
        return 1 - this._base;
      case  'secondBase':
        return 2 - this._base;
      case  'thirdBase':
        return 3 - this._base;
      case  'homeBase':
        return 4 - this._base;
      default:
        console.error("Bad destination in `calculateDistance`: " + destination)
        alert("Coding error: check console")  // TODO: remove in dev
        return 0;
    }
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
      console.log('Button clicked:', button);

      if (!button.responsibleRequired) {
        this.postAction(button);
      } else {
        this.setButton(button)
        this.clearResponsiblePlayers(); // Reset the selected players list
      }
    } else {
      if (this.isDestination(button)) {
        this._distance = this.calculateDistance(button.button);
      }
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
      return buttons;
    } else {
      return Object.entries(buttons)
        .filter(v => v[1] !== null)
        .map(([key, _]) => {
          return {'button': key};
        });
    }
  }

  onConfirmation() {
    if (this.selectedButton) {
      // Split the conditions into separate boolean variables
      const isResponsibleRequired = this.selectedButton.responsibleRequired;
      const isMultipleResponsibleRequired = this.selectedButton.multipleResponsibleRequired;
      const hasSingleResponsiblePlayer = this.selectedResponsiblePlayers.length === 1;
      const hasMultipleResponsiblePlayers = this.selectedResponsiblePlayers.length >= 2;

      // Define the isValidSelection boolean based on these variables
      const isValidSelection = isResponsibleRequired && (
        (isMultipleResponsibleRequired && hasMultipleResponsiblePlayers) ||
        (!isMultipleResponsibleRequired && hasSingleResponsiblePlayer)
      );

      // Check each condition and show alerts for invalid cases
      if (isResponsibleRequired) {
        if (isMultipleResponsibleRequired && !hasMultipleResponsiblePlayers) {
          alert("You must select at least two responsible players.");
        } else if (!isMultipleResponsibleRequired && !hasSingleResponsiblePlayer) {
          alert("You must select exactly one responsible player.");
        }
      } else {
        alert("Selection is not valid because responsible selection is not required.");
      }

      if (isValidSelection) {
        this.postAction(this.selectedButton);
      } else {
        console.error('Invalid selection of responsible players');
      }
    }
  }

  undoSelection() {
    this.clearAll();
    this.refreshButtons();
  }

  mapNumberToBaseballPosition(num: number): string {
    const positions: { [key: number]: string } = {
      1: 'PITCHER',
      2: 'CATCHER',
      3: 'FIRST_BASE',
      4: 'SECOND_BASE',
      5: 'THIRD_BASE',
      6: 'SHORTSTOP',
      7: 'LEFT_FIELD',
      8: 'CENTER_FIELD',
      9: 'RIGHT_FIELD'
    };

    if (num >= 1 && num <= 9) {
      return positions[num];
    } else {
      throw new Error('Input must be a number from 1 to 9.');
    }
  }

  private postAction(button: Button) {
    // map responsible to objects
    const responsibleToPost: Responsible[] = [];

    for (const position of this.selectedResponsiblePlayers) {
      responsibleToPost.push({defencePosition: this.mapNumberToBaseballPosition(position)});
    }

    const postData: ActionPost = {
      base: this.base,
      distance: this._distance,
      type: button.actionType,
      responsible: responsibleToPost
    };

    if (!this._game.id) {
      console.error('Game id not found! Check `GamePageService`!');
      return;
    }

    this.service.postGameAction(this.game.id, postData).subscribe({
      next: (msg) => {
        console.log('Server response: ', msg);
        this.clearAll();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.NotImplemented) {
          alert("Not implemented: " + err.error.message);
          this.clearAll();  // if command is not implemented we can clean the input
        } else {
          alert("Unknown error: " + err.error.message);
          console.log('Unknown error: ', err);
        }
      }
    });
  }

  setButton(button: Button) {
    this.selectedButton = button; // Store the selected button
    this.service.updateSelectedButton(button)
  }

  clearResponsiblePlayers() {
    this.selectedResponsiblePlayers = [];
    this.service.clearSelectedPlayers();
  }

  clearButton() {
    this.selectedButton = null; // Remove selected button
    this.service.clearSelectedButton();
  }

  clearAll() {
    // Step 1: clean selected button
    this.clearButton();
    // Step 2: clean responsible
    this.clearResponsiblePlayers();
    // Step 3: reset distance
    this._distance = 0
  }
}
