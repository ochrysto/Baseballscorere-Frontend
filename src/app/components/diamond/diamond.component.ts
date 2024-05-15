import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {GamePageService} from "../../services/game-page.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-diamond',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './diamond.component.html',
  styleUrl: './diamond.component.css',
})
export class DiamondComponent implements OnInit {
  base: number = 0;
  center = '';
  first = '';
  second = '';
  third = '';
  home = '';
  public currentInningStatus!: string;
  strokeColor: any;

  constructor(private gamePageService: GamePageService) {
  }


  ngOnInit() {
    this.gamePageService.inningStatus$.subscribe(inningStatus => {
      this.currentInningStatus = inningStatus;
    })
  }

  getDynamicClass() {
    console.log(this.currentInningStatus);
    return this.currentInningStatus === 'isTopInning' ? 'frame-visitor' : 'frame-home';
  }
}

