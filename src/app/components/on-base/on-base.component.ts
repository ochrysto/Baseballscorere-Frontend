import {Component, OnInit} from '@angular/core';
import {GamePageService} from "../../services/game-page.service";
import {LineUpPlayers} from "../../models/line-up-players";

@Component({
  selector: 'app-on-base',
  standalone: true,
  imports: [],
  templateUrl: './on-base.component.html',
  styleUrl: './on-base.component.css'
})
export class OnBaseComponent implements OnInit{
  onBaseList: LineUpPlayers[] = [];
  constructor(private gamePageService: GamePageService) {
  }
  ngOnInit() {
    this.onBaseList = this.gamePageService.getAllGuestPlayer();
  }
}
