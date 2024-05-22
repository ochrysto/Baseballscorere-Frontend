import {Component, Input, OnInit} from '@angular/core';
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

  @Input() content!: any; // Diamonds could be undefined
  base: number =  0;
  center =  '';
  first =  '';
  second =  '';
  third = '';
  home = '';
  util: string = '';

  public currentInningStatus!: string;

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

