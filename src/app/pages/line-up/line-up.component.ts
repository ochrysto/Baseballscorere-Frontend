import { Component, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {async, Observable, of} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {RouterModule, RouterLink, Router} from "@angular/router";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {AsyncPipe, NgClass} from "@angular/common";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LineUpServiceService} from "../../services/line-up-service.service";
@Component({
  selector: 'app-line-up',
  templateUrl: './line-up.component.html',
  imports: [RouterModule,
    NgClass,
    RouterLink,
    MatAutocompleteTrigger,
    MatAutocomplete,
    ReactiveFormsModule,
    MatSlideToggle,
    AsyncPipe,
    MatOption,
    HttpClientModule,
  ],
  standalone: true,
  styleUrls: ['./line-up.component.css']
})
export class LineUpComponent {
  Verein_name: string = '';
  Teams_name: string = '';
  Manager: string = '';
  PassnummerOptions$: Observable<any[]> = of([]);
  nameOptions$: Observable<any[]> = of([]);
  PositionOptions$: Observable<any[]> = of([]);
  PassnummerOptions = [
    { id: 1, name: 'Madrid' },
    { id: 2, name: 'Barcelone' },
    { id: 3, name: 'Bayern' }
  ];
  nameOptions = [
    { id: 1, name: 'Madrid 1' },
    { id: 2, name: 'Barcelone 2' },
    { id: 3, name: 'Bayern 3' }
  ];
  PositionOptions = [
    { id: 1, name: 'Regragi' },
    { id: 2, name: 'Ancelotti' },
    { id: 3, name: 'Enrique' }
  ];
  constructor(private router: Router, private LineUpServiceService: LineUpServiceService) { }

  activeTab: string = 'HEIM'; // Standardmäßig 'HEIM' als aktiver Tab
  switchTab(tabName: string): void {
    this.activeTab = tabName;
    this.updateContainerBorder();
  }
  updateContainerBorder(): void {
    const border = document.querySelector('.border') as HTMLElement;
    if (border) {
      border.classList.remove('active-home', 'active-guest');
      if (this.activeTab === 'HEIM') {
        border.classList.add('active-home');
      } else if (this.activeTab === 'GAST') {
        border.classList.add('active-guest');
      }
    } else {
      console.error('border element not found!');
    }
  }
  myControl = new FormControl();
  option: string[] = ['test', 'Ghost'];
  filteredOptions: Observable<string[]> | undefined;
  ngOnInit() {
    {
      this.fetchnames();
      this.fetchPassnummer();
      this.fetchPosition();
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.option.filter(option => option.toLowerCase().includes(filterValue));
  }
    protected readonly async = async;

  fetchnames(){
    this.nameOptions$ = this.LineUpServiceService.getName();
  }
  fetchPassnummer(){
    this.PassnummerOptions$ = this.LineUpServiceService.getPassnummer();
  }
  fetchPosition(){
    this.PositionOptions$ = this.LineUpServiceService.getPosition();
  }

}
