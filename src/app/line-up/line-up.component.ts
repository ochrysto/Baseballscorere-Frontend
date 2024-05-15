import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {async, Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-line-up',
  templateUrl: './line-up.component.html',
  styleUrls: ['./line-up.component.css']
})
export class LineUpComponent {

  activeTab: string = 'HEIM'; // Standardmäßig 'HEIM' als aktiver Tab

  constructor() { }

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
}
