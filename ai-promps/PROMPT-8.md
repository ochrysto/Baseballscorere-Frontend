You are Senior JavaScript Angular Developer that know how to build robust and reusable frontend applications with Angular V17.
You know all best practices and write clean, well-documented code with SOLID, DRY and KISS principles in mind.

```typescript
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TeamPost } from '../../models/team-post';
import { TeamService } from '../../services/Team.service';
import { ClubGet } from '../../models/club-get';
import { ManagerGet } from '../../models/manager-get';
import { LeagueGet } from '../../models/league-get';
import { TeamGet } from '../../models/team-get';

@Component({
  selector: 'app-teaminformationen-bearbeiten',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './teaminformationen-bearbeiten.component.html',
  styleUrl: './teaminformationen-bearbeiten.component.css'
})
export class TeaminformationenBearbeitenComponent implements OnChanges {
  @Output() close = new EventEmitter<void>();

  @Input()
  set team(team: TeamGet | null) {
    this._team = team;
  };

  get team(): TeamGet | null {
    return this._team;
  }

  private _team: TeamGet | null = null;
  //name: string = '';
  //managerId: number = 0;
  //clubId: number = 0;
  //leagueId: number = 0;
  logo: File | null = null;
  fileName: string = 'Keine Datei ausgewählt';
  teamForm: FormGroup;

  protected clubs: ClubGet[] = [];
  protected managers: ManagerGet[] = [];
  protected leagues: LeagueGet[] = [];

  constructor(private fb: FormBuilder, private router: Router, private teamService: TeamService) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      managerId: ['', Validators.required],
      clubId: ['', Validators.required],
      leagueId: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.teamService.getClubs().subscribe({
      next: clubs => this.clubs = clubs,
      error: err => console.error('Cannot get clubs: ' + err)
    });

    this.teamService.getManagers().subscribe({
      next: managers => this.managers = managers,
      error: err => console.error('Cannot get managers: ' + err)
    });

    this.teamService.getLeagues().subscribe({
      next: leagues => this.leagues = leagues,
      error: err => console.error('Cannot get leagues: ' + err)
    });
  }

  onFileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.logo = fileList[0];
      this.fileName = this.logo.name; // Update the file name
    }
  }

  onSubmit() {
    const formValues = this.teamForm.value;

    let postData: TeamPost = {
      name: formValues.name,  // this.name,
      managerId: formValues.managerId,  // this.managerId,
      clubId: formValues.clubId,   // this.clubId,
      leagueId: formValues.leagueId,   // this.leagueId,
      teamLogo: null   // null
    };

    if (this.team == null) {
      alert('Cannot update team: `teamId` is null.');
      return;
    }

    this.teamService.updateTeam(this.team.teamId, postData).subscribe({
      next: value => {
        console.log('Successfully updated team with id ' + this.team?.teamId);
      },
      error: err => {
        console.error('Cannot update team with id ' + this.team?.teamId);
      }
    });

    //console.log('Form submitted with data:', formData);
    // Handle the actual form submission logic here, such as sending the form data to a server
    // For the sake of this example, navigate to the team edit page with a dummy ID
    //this.router.navigate(['/team_erstellen', 1]);
  }

  closePopup() {
    this.close.emit();
  }
}
```

```html
<div class="team-info-popup">
  <form [formGroup]="teamForm" (ngSubmit)="onSubmit()" class="team-info-form">
    <div class="form-group">
      <label for="Liga_Name"><i class="fas fa-trophy icons"></i> Liga Name</label>
      <select id="Liga_Name" name="Liga_Name" formControlName="leagueId"> <!-- [(ngModel)]="leagueId" required> -->
        <option [value]="team?.league?.id" disabled hidden selected>{{ team?.league?.name }}</option>
        <option *ngFor="let league of leagues" [value]="league.id">{{ league.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="Verein_name"><i class="fas fa-shield-alt icons"></i> Name der Verein</label>
      <select id="Verein_name" name="Verein_name" formControlName="clubId"> <!--  [(ngModel)]="clubId" required> -->
        <option [value]="team?.club?.id" disabled hidden selected>{{ team?.club?.name }}</option>
        <option *ngFor="let club of clubs" [value]="club.id">{{ club.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="Teams_name"><i class="fas fa-users icons"></i> Name des Teams</label>
      <input id="Teams_name" name="Teams_name" formControlName="name" [value]="team?.name"> <!-- [(ngModel)]="name" value="{{ team?.name }}" required> -->
    </div>
    <div class="form-group file-upload">
      <label style="color: black" for="Logo" class="file-upload-label">
        <i class="fas fa-image icons"></i> Logo hochladen
      </label>
      <input type="file" id="Logo" name="Logo" (change)="onFileChange($event)" required>
      <span id="file-name">{{ fileName }}</span>
    </div>
    <div class="form-group">
      <label for="Manager"><i class="fas fa-user-tie icons"></i> Manager</label>
      <select id="Manager" name="Manager" formControlName="managerId"> <!-- [(ngModel)]="managerId" required> -->
        @if (team != null) {
        <option value="{{ team.manager.id }}" disabled hidden selected>{{ team.manager.firstName }} {{ team.manager.lastName }}</option>
        }
        <option *ngFor="let manager of managers" [value]="manager.id">{{ manager.firstName }} {{ manager.lastName }}</option>
      </select>
    </div>
    <button type="submit" class="save-button"><i class="fas fa-save"></i> speichern</button>
  </form>
</div>
```

Problem: `disabled hidden selected` options in three `select` tags should be default options at the start but I cant see the text but options are in HTML `<option _ngcontent-ng-c681652760="" disabled="" hidden="" selected="" value="4" ng-reflect-value="4">Herbert Zacharias</option>`
Also I want to see default text of input `Teams_name` but I see empty input field.
Task:
1. Fix html and typescript (if needed) so user see initial values in 3 selects and input.
