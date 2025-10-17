import { Component, OnInit } from '@angular/core';
import { WrapUpGeneralData } from '../../models/wrap-up-general-data';
import { WrapUpService } from '../../services/wrap-up.service';
import { interval } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-wrap-up-scoresheets',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './wrap-up-scoresheets.component.html',
  styleUrl: './wrap-up-scoresheets.component.css',
})
export class WrapUpScoresheetsComponent implements OnInit {
  generalData: WrapUpGeneralData | null = null;
  currentTime: Date = new Date();
  constructor(private service: WrapUpService) {
    interval(1000).subscribe(() => {
      this.currentTime = new Date();
    });
  }
  ngOnInit(): void {
    this.service.getGeneralData().subscribe((data) => {
      this.generalData = data;
    });
  }
}
