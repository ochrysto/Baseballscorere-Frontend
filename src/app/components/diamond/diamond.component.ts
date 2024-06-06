import { Component, Input, OnInit } from '@angular/core';
import { GamePageService } from '../../services/game-page.service';
import { NgClass } from '@angular/common';
import { DiamondGet } from '../../models/diamond-get';

@Component({
  selector: 'app-diamond',
  standalone: true,
  imports: [NgClass],
  templateUrl: './diamond.component.html',
  styleUrl: './diamond.component.css',
})
export class DiamondComponent implements OnInit {
  @Input() content!: DiamondGet; // Diamonds could be undefined
  base: number = 0; // draws basepath matching the progress
  center: string = ''; //text to the centertextfield
  first: string = ''; //text to the textfield in the bottom right corner
  second: string = ''; //text to the textfield in the top right corner
  third: string = ''; //text to the textfield in the top left corner
  home: string = ''; //text to the textfield in the bottom left corner
  util: string = ''; //draws X when not played

  public currentInningStatus!: string;

  constructor(private gamePageService: GamePageService) {}

  ngOnInit() {
    this.gamePageService.inningStatus$.subscribe((inningStatus) => {
      this.currentInningStatus = inningStatus;
    });
  }

  /**
   * changes the color of the diamond by inningstatus
   */
  getDynamicClass() {
    return this.currentInningStatus === 'isTopInning' ? 'frame-visitor' : 'frame-home';
  }
}
