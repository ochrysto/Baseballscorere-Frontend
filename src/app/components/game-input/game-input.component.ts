import { Component, Input } from '@angular/core';
import { Button } from '../../models/button';
import { GamePageService } from '../../services/game-page.service';
import { ActionPost } from '../../models/action-post';
import { ActionsGet } from '../../models/actions-get';
import { GameGet } from '../../models/game-get';
import { Responsible } from '../../models/responsible';

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

  buttonStack: any[][] = []; // Stack to keep track of button states for back navigation.
  _base: number = 1;
  _game!: GameGet;
  _actions!: ActionsGet;
  currentButtons: any; // Array to hold the currently displayed buttons.
  showBackButton: boolean = false; // Flag to control the visibility of the back button.
  selectedButton: Button | null = null; // Store the currently selected button
  selectedResponsiblePlayers: number[] = []; // Store the selected defensive player positions

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
      console.log('Button clicked:', button);

      this.selectedButton = button; // Store the selected button

      if (!button.responsibleRequired) {
        this.postAction(button);
      } else {
        this.selectedResponsiblePlayers = []; // Reset the selected players list
      }
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
      return buttons;
    } else {
      return Object.entries(buttons)
        .filter(v => v[1] !== null)
        .map(([key, _]) => {
          return { 'button': key };
        });
    }
  }

  onConfirmation() {
    if (this.selectedButton) {
      const isValidSelection = this.selectedButton.responsibleRequired &&
        ((this.selectedButton.multipleResponsibleRequired && this.selectedResponsiblePlayers.length >= 2) ||
          (!this.selectedButton.multipleResponsibleRequired && this.selectedResponsiblePlayers.length === 1));

      if (isValidSelection) {
        this.postAction(this.selectedButton);
      } else {
        console.error('Invalid selection of responsible players');
      }
    }
  }

  undoSelection() {
    this.selectedResponsiblePlayers = [];
    this.service.clearSelectedPlayers();
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
    let responsibleToPost: Responsible[] = [];

    for (let position of this.selectedResponsiblePlayers) {
      responsibleToPost.push({ defencePosition: this.mapNumberToBaseballPosition(position) });
    }

    let postData: ActionPost = {
      base: this.service.selectedBase.getValue(),
      distance: 0,
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
        this.service.clearSelectedPlayers();
      },
      error: (err) => {
        console.log('Error: ', err);
      }
    });
  }
}
