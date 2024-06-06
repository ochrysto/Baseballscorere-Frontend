import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Router, RouterLink } from '@angular/router';
import { TeamServesService } from '../../services/team-serves.service';
import { TeamGet } from '../../models/team-get';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-select-page',
  standalone: true,
  imports: [
    NavBarComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './team-select-page.component.html',
  styleUrls: ['./team-select-page.component.css']
})
export class TeamSelectPageComponent {
  protected teams: TeamGet[] = [];
  protected selectedTeamId: number | null = null;

  constructor(private service: TeamServesService, private router: Router) {
    this.service.getAllTeams().subscribe({
      next: teams => this.teams = teams,
      error: err => alert("Cannot get teams: " + err)
    });
  }

  editTeam() {
    if (this.selectedTeamId !== null) {
      this.router.navigate(['/edit-team', this.selectedTeamId]);
    }
  }
}
