import {Component} from '@angular/core';
import {TeamServesService} from "../services/team-serves.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-spiel-anlegen',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './spiel-anlegen.component.html',
  styleUrl: './spiel-anlegen.component.css'
})
export class SpielAnlegenComponent {
  public allteams: any [] = [];

  constructor(private teamserves: TeamServesService) {
    this.allteams = this.teamserves.getAllTeams();
  }
}
