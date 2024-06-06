import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TeamPost } from '../../models/team-post';
import { TeamService } from '../../services/team.service';
import { ClubGet } from '../../models/club-get';
import { ManagerGet } from '../../models/manager-get';
import { LeagueGet } from '../../models/league-get';
import { TeamGet } from '../../models/team-get';

@Component({
  selector: 'app-team-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnChanges {
  @Output() close = new EventEmitter<void>();

  @Input()
  set team(team: TeamGet | null) {
    this._team = team;
    if (team) {
      this.teamForm.patchValue({
        name: team.name,
        managerId: team.manager.id,
        clubId: team.club.id,
        leagueId: team.league.id
      });
    }
  }

  get team(): TeamGet | null {
    return this._team;
  }

  private _team: TeamGet | null = null;
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
    if (changes['team'] && this.team) {
      this.teamForm.patchValue({
        name: this.team.name,
        managerId: this.team.manager.id,
        clubId: this.team.club.id,
        leagueId: this.team.league.id
      });
    }

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
      name: formValues.name,
      managerId: formValues.managerId,
      clubId: formValues.clubId,
      leagueId: formValues.leagueId,
      teamLogo: null
    };

    if (this.team == null) {
      alert('Cannot update team: `teamId` is null.');
      return;
    }

    this.teamService.updateTeam(this.team.teamId, postData).subscribe({
      next: value => {
        console.log('Successfully updated team with id ' + this.team?.teamId);
        this.teamService.triggerTeamWasUpdated();
        this.closePopup();
      },
      error: err => {
        console.error('Cannot update team with id ' + this.team?.teamId);
        alert('Cannot update team with id ' + this.team?.teamId);
      }
    });
  }

  closePopup() {
    this.close.emit();
  }
}
