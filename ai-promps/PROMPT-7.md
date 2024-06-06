You are Senior JavaScript Angular Developer that know how to build robust and reusable frontend applications with Angular V17.
You know all best practices and write clean, well-documented code with SOLID, DRY and KISS principles in mind.

team-select-page.component.html
```html
<div class="main">
  <img src="../../../assets/Hitter.png" class="hitter" alt="baseballplayer hitting">
  <div class="container">
    <app-nav-bar></app-nav-bar>

    <select>
      <option disabled hidden selected>Wähle ein Team aus</option>
      <!-- TODO: Implement here -->
    </select>

    <div class="content">
      <button routerLink="/game">Team bearbeiten</button>
    </div>
  </div>
</div>

```

team-select-page.component.ts
```typescript
import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { RouterLink } from '@angular/router';
import { TeamServesService } from '../../services/team-serves.service';
import { TeamGet } from '../../models/team-get';

@Component({
  selector: 'app-team-select-page',
  standalone: true,
    imports: [
        NavBarComponent,
        RouterLink
    ],
  templateUrl: './team-select-page.component.html',
  styleUrl: './team-select-page.component.css'
})
export class TeamSelectPageComponent {
  protected teams: TeamGet[] = [];

  constructor(private service: TeamServesService) {
    service.getAllTeams().subscribe({
      next: teams => this.teams = teams,
      error: err => alert("Cannot get teams: " + err)
    })
  }
}
```

team-get.ts
```typescript
import {LeagueGet} from "./league-get";
import {ManagerGet} from "./manager-get";
import {ClubGet} from "./club-get";

export interface TeamGet {
  teamId: number;
  name: string;
  club: ClubGet;
  manager: ManagerGet;
  league: LeagueGet;
  teamLogo: string;
}

```

Task:
1. User should be able to select a team and after clicking `Team bearbeiten` button he should go to the page `edit-team/:id` where id is `TeamGet.teamId`.


Super, it works!

team-select-page.component.html
```html
<div class="main">
  <img src="../../../assets/Hitter.png" class="hitter" alt="baseballplayer hitting">
  <div class="container">
    <app-nav-bar></app-nav-bar>

    <select [(ngModel)]="selectedTeamId">
      <option disabled hidden selected value="">Wähle ein Team aus</option>
      @for (team of teams; track team) {
      <option [value]="team.teamId">{{ team.name }}</option>
      }
    </select>

    <div class="content">
      <button (click)="editTeam()" [disabled]="!selectedTeamId">Team bearbeiten</button>
    </div>
  </div>
</div>
```

```css
.main {
  display: flex;
}

.container {
  font-family: Kanit, sans-serif;
  width: 60vw;
  height: 100vh;
  justify-content: flex-end;
  margin-left: auto;
}

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
}

.header a {
  font-family: inherit;
  margin-right: 50px;
  font-size: 2vh;
  font-weight: 500;
  text-decoration: none;
  color: var(--card-darkbrown);
}

.header a:hover {
  color: var(--lightgray);
  cursor: pointer;
}

.header button {
  font-family: inherit;
  background-color: var(--card-darkbrown);
  color: var(--actiongreen);
  font-size: 2vh;
  padding: 20px 30px;
  border-radius: 20px;
  cursor: pointer;
}

.header button:hover {
  background-color: var(--actiongreen);
  color: var(--card-darkbrown);
}

.hitter {
  position: absolute;
  height: 120vh;
}

.content {
  font-family: inherit;
  padding: 9vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content h1 {
  font-family: inherit;
  color: var(--darkgray);
  font-weight: 800;
  font-size: 4.9vw;
  letter-spacing: -1px;
}

.content p {
  color: var(--card-darkbrown);
  font-weight: 400;
  font-size: 2vh;
  width: 50%;
  padding: 40px;
  line-height: 1.5;
}

.content button {
  font-family: inherit;
  background-color: var(--card-darkbrown);
  color: var(--actiongreen);
  font-size: 3vh;
  border-radius: 20px;
  padding: 30px;
  width: 50%;
  cursor: pointer;
}

.content button:hover {
  background-color: var(--actiongreen);
  color: var(--card-darkbrown);
}
```

Task:
1. Put the selection field into the some sort of window in the middle. Make it looks beautiful, harmonic and user friendly. Stick to the style!
