import { Component } from '@angular/core';
import { Button } from '../../models/button';
import { GamePageService } from '../../services/game-page.service';
import {ActionPost} from "../../models/action-post";

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
    this.loadButtons(this.service.selectedBase.getValue())
    service.selectedBase.subscribe({
      next: base => {
        this.loadButtons(base)
      },
      error: err => {}
    });
  }

  loadButtons(base: number) {
    // TODO: remove handcode ID
    this.service.getGameActions(1).subscribe({
      next: (buttons) => {
        let selectedButtons = null;
        switch (base) {
          case 0:
            selectedButtons = buttons["batter"];
            break;
          case 1:
            selectedButtons = buttons["firstBaseRunner"];
            break;
          case 2:
            selectedButtons = buttons["secondBaseRunner"];
            break;
          case 3:
            selectedButtons = buttons["thirdBaseRunner"];
        }
        this.currentButtons = selectedButtons;
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
      typeof obj.actionType === 'string' &&
      typeof obj.responsibleRequired === 'boolean' &&
      typeof obj.multipleResponsibleRequired === 'boolean'
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
      let postData: ActionPost = {
        base: this.service.selectedBase.getValue(),
        distance: 0,
        type: button.actionType,
        responsible: []
      }
      this.service.postGameAction(1, postData).subscribe({
        next: (msg) => {console.log("Server response: ", msg)},
        error: (err) => {console.log("Error: ", err)}
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
