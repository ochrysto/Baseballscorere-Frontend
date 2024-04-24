import { Component, EventEmitter } from '@angular/core';
import {PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-game-input',
  standalone: true,
  imports: [],
  templateUrl: './game-input.component.html',
  styleUrl: './game-input.component.css',
})
export class GameInputComponent {
  constructor(private playerService: PlayerService) {}
  selection = '';
  firstButtonValue: string = '';
  breadcrumb = '';
  groundOutScore = '';
  positionCounter: string[] = [];

  selectB = true;

  selectButtonsVisible = true;
  hitButtonsVisible = false;
  outButtonsVisible = false;
  errorButtonsVisible = false;
  selectPositionsVisible: boolean = false;
  isGroundOut: boolean = false;
  assistError: boolean = false;

  showButtons(category: string): void {
    this.addBreadcrumb(category);
    this.selectButtonsVisible = false;
    switch (category) {
      case 'Hit': {
        this.hitButtonsVisible = true;
        break;
      }
      case 'Out': {
        this.outButtonsVisible = true;
        break;
      }
      case 'Error': {
        this.errorButtonsVisible = true;
        break;
      }
      case 'A-E': {
        this.onAssistError();
        break;
      }
      case 'GO': {
        this.onGroundOut();
        break;
      }
      case 'F':
      case 'U':
      case 'OBR':
      case 'E': {
        this.onFirstButtonClick(category);
        this.selectPositionsVisible = true;
        break;
      }
      default: {
        this.selectButtonsVisible = true;
      }
    }
  }

  private hideButtons(): void {
    this.hitButtonsVisible = false;
    this.outButtonsVisible = false;
    this.errorButtonsVisible = false;
    this.selectPositionsVisible = false;
  }

  onSelect(value: string) {
    this.selectButtonsVisible = false;
    this.selection = value;
    this.addBreadcrumb(value);
    this.hideButtons();
    this.isGroundOut = false;
  }

  onConfirmation(selection: string) {
    this.playerService.score = selection;
    this.hideButtons();
    this.breadcrumb = '';
    this.groundOutScore = '';
    this.selectButtonsVisible = true;
    this.assistError = false;
    this.selection = '';
    this.positionCounter = [];
    this.firstButtonValue = '';
    this.isGroundOut = false;
  }

  private addBreadcrumb(value: string) {
    this.breadcrumb += ' > ' + value;
  }

  undoSelection() {
    this.selection = '';
    this.hideButtons();
    this.breadcrumb = '';
    this.selectButtonsVisible = true;
    this.isGroundOut = false;
    this.assistError = false;
    this.groundOutScore = '';
  }

  private onFirstButtonClick(score: string) {
    this.hideButtons();
    this.firstButtonValue = score;
  }

  onSecondButtonClick(score: string) {
    if (this.firstButtonValue) {
      const combinedScore = this.firstButtonValue + score;
      this.onSelect(combinedScore);
    }
    if (this.isGroundOut) {
      if (this.groundOutScore != '') {
        this.groundOutScore = this.groundOutScore + '-' + score;
        this.selection = this.groundOutScore;
        this.addBreadcrumb(this.groundOutScore);
      } else {
        this.addBreadcrumb(score);
        this.groundOutScore = score;
      }
    }
    if (this.assistError) {
      if (this.selection === '') {
        this.selection = score + '-E';
      } else {
        this.selection += score;
        this.addBreadcrumb(this.selection);
      }
    }
  }
  private onGroundOut() {
    this.hideButtons();
    this.selectPositionsVisible = true;
    this.isGroundOut = true;
  }

  private onAssistError() {
    this.hideButtons();
    this.selectPositionsVisible = true;
    this.assistError = true;
  }
}
