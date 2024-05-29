import { Component } from '@angular/core';
import { ActionsGet } from '../../models/actions-get';
import { Button } from '../../models/button';
import { GamePageService } from '../../services/game-page.service';

@Component({
  selector: 'app-game-input',
  standalone: true,
  templateUrl: './game-input.component.html',
  styleUrl: './game-input.component.css',
})
export class GameInputComponent {
  buttonStack: any[][] = []; // Stack to keep track of button states for back navigation.
  currentButtons: any; // Array to hold the currently displayed buttons.
  showBackButton: boolean = false; // Flag to control the visibility of the back button.

  constructor(private service: GamePageService) {
    this.loadButtons()
  }

  loadButtons() {
    // TODO: remove handcode ID
    this.service.getGameActions(1).subscribe({
      next: (buttons) => {
        this.currentButtons = buttons;
        console.log("Successfully got buttons from python backend. Thanks Mischa!")
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isButton(obj: any): obj is Button {
    return (
      typeof obj.button === 'string' &&
      typeof obj.action_type === 'string' &&
      typeof obj.responsible_required === 'boolean' &&
      typeof obj.multiple_responsible_required === 'boolean'
    );
  }


  /**
   * Handles button click events.
   * @param button The clicked button object.
   */
  handleButtonClick(button: any) {
    if (this.isButton(button)) {
      console.log("Tiefpunkt erreicht")
      // TODO: add logic for the buttons here
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
        .map(([key, _]) => { return {'button': key} });
    }
  }

  onConfirmation() {
    return null
  }

  undoSelection() {
    return null
  }
}
