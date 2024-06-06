import { Component, OnInit } from '@angular/core';
import { GamePageService } from '../../services/game-page.service';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [],
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.css'
})
export class GameHeaderComponent implements OnInit {
  private currentDate = new Date();
  currentTime!: string;
  day = this.currentDate.getDate().toString().padStart(2, '0');
  month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
  year = this.currentDate.getFullYear();
  //stopwatch
  private intervalId!: number;
  private isStarted = false;
  elapsedTime = 0;

  constructor(protected gamePageService: GamePageService) {
  }

  ngOnInit() {
    this.updateTime();
  }

  /**
   * refreshes page to display current time
   * @private
   */
  private updateTime() {
    const timeObservable = interval(1000).pipe(
      map(() => this.getCurrentTimeString()));
    timeObservable.subscribe((currentTimeString) => this.currentTime = currentTimeString);
  }

  private getCurrentTimeString() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * starts and ends game
   */
  //TODO add link to confirmationpage if 'ballgame' is clicked (gameIsOn = false)
  toggleGame() {
    this.gamePageService.gameIsOn = !this.gamePageService.gameIsOn;
    this.gamePageService.gameIsOn ? this.startTimer() : this.stopTimer();
  }

  /**
   * starts the timer and counts in minutes
   */
  startTimer() {
    if (!this.isStarted) {
      this.isStarted = true;
      this.intervalId = setInterval(() => {
        this.elapsedTime++;
      }, 60000);
    }
  }

  /**
   * stops timer
   */
  stopTimer() {
    if (this.isStarted) {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    }
  }
}


