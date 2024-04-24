import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';

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

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
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

