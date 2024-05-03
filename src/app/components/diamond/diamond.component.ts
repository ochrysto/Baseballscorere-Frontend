import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import {GamePageService} from "../../services/game-page.service";

@Component({
  selector: 'app-diamond',
  standalone: true,
  imports: [],
  templateUrl: './diamond.component.html',
  styleUrl: './diamond.component.css',
})
export class DiamondComponent {
  base: number = 0;
  center = '';
  first = '';
  second = '';
  third = '';
  home = '';
  private currentInningStatus!: string;
  strokeColor: any;

  constructor(private playerService: PlayerService,
              private gamePageService: GamePageService) {
    this.strokeColor = 'red';
  }

  ngOnInit() {
    this.gamePageService.inningStatus$.subscribe(inningStatus => {
      this.currentInningStatus = inningStatus;})
    console.log('onInit');
    this.playerService.call.subscribe((call) => {
      this.center = call[0];
      this.first = call[1];
      this.second = call[2];
      this.third = call[3];
      this.home = call[4];
      this.base = parseInt(call[5]);
    });
  }
}

