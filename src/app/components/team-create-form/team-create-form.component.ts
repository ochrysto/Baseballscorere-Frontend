import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {TeamService} from '../../services/team.service';
import {of, Observable} from 'rxjs';

@Component({
    selector: 'app-team-create-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    templateUrl: './team-create-form.component.html',
    styleUrls: ['./team-create-form.component.css']
})
export class TeamCreateFormComponent implements OnInit {
    Verein_name: string = '';
    Team_name: string = '';  // Changed to Team_name for better clarity
    Manager: string = '';
    logo: File | null = null;
    Liga_Name: string = '';
    ligaOptions$: Observable<any[]> = of([]);
    ClubOptions$: Observable<any[]> = of([]);
    ManagerOptions$: Observable<any[]> = of([]);

    constructor(private teamService: TeamService, private router: Router) {
    }

    ngOnInit() {
        this.fetchLeagues();
        this.fetchClubs();
        this.fetchManagers();
    }

    fetchLeagues() {
        this.ligaOptions$ = this.teamService.getLeagues();
    }

    fetchClubs() {
        this.ClubOptions$ = this.teamService.getClubs();
    }

    fetchManagers() {
        this.ManagerOptions$ = this.teamService.getManagers();
    }

    onFileChange(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
        if (fileList) {
            this.logo = fileList[0];
        }
    }

    onSubmit() {
        const jsonData: any = {
            "name": this.Team_name,
            'managerId': this.Manager,
            'clubId': this.Verein_name,
            'leagueId': this.Liga_Name
        }

        this.teamService.saveTeam(jsonData).subscribe(response => {debugger;
            console.log('Team saved successfully:', response);
            this.router.navigate(['/TeamBearbeiten', response.teamId]);
        }, error => {
            console.error('Error saving team:', error);
        });
    }
}
