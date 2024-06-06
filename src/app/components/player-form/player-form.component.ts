import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {TeamService} from "../../services/team.service";

interface Player {
  id: number;
  firstName: string;
  lastName: string;
  passnumber: number;
}

interface Team {
  teamId: number; // Ensure the teamId matches the API response
  name: string;
}

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  @Input() team: Team | null = null;
  allPlayers: Player[] = [];
  selectedPlayers: Player[] = [];

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
    this.fetchAllPlayers();
  }

  fetchAllPlayers() {
    this.teamService.getAllPlayers().subscribe({
      next: players => this.allPlayers = players,
      error: error => console.error('Error fetching players:', error)
    });
  }

  onPlayerSelect(player: Player, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedPlayers.push(player);
    } else {
      this.selectedPlayers = this.selectedPlayers.filter(p => p.id !== player.id);
    }
  }

  addSelectedPlayers() {
    if (this.selectedPlayers.length > 0 && this.team !== null) {
      const playerIds = this.selectedPlayers.map(player => player.id);
      console.log(`Adding players to team with ID: ${this.team.teamId}`);
      this.teamService.addPlayersToTeam(this.team.teamId, playerIds).subscribe({
        next: () => {
          console.log('Players added to team');
          this.selectedPlayers = [];
          const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
          checkboxes.forEach(cb => cb.checked = false);
          this.teamService.triggerPlayersWasAdded();
        },
        error: error => console.error('Error adding players to team:', error)
      });
    } else {
      console.error('Selected team ID is missing');
    }
  }
}
