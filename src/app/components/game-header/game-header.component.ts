import { Component } from '@angular/core';

@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [],
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.css'
})
export class GameHeaderComponent {

  currentDate = new Date();
  day= this.currentDate.getDate().toString().padStart(2, '0');
  month= (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
  year = this.currentDate.getFullYear();
  hours = this.currentDate.getHours().toString().padStart(2, '0'); //starts with zero if needed
  minutes = this.currentDate.getMinutes().toString().padStart(2, '0');

}
