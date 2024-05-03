import {Component, OnInit} from '@angular/core';
import {GamePageService} from "../../services/game-page.service";
import {interval} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [],
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.css'
})
export class GameHeaderComponent implements OnInit{

  constructor(protected gamePageService: GamePageService) {
  }

  private currentDate = new Date();

  currentTime!: string;
  day = this.currentDate.getDate().toString().padStart(2, '0');
  month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
  year = this.currentDate.getFullYear();

  ngOnInit() {
    this.updateTime();
  }
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


  toggleGame() {
    this.gamePageService.gameIsOn = !this.gamePageService.gameIsOn;

    //TODO add link to confirmationpage if 'ballgame' is clicked (gameIsOn = false)
  }
}


