import { Component } from '@angular/core';
import { WrapUpSignComponent } from '../../components/wrap-up-sign/wrap-up-sign.component';
import { WrapUpScoresheetsComponent } from '../../components/wrap-up-scoresheets/wrap-up-scoresheets.component';

@Component({
  selector: 'app-wrap-up-page',
  standalone: true,
  imports: [WrapUpSignComponent, WrapUpScoresheetsComponent],
  templateUrl: './wrap-up-page.component.html',
  styleUrl: './wrap-up-page.component.css',
})
export class WrapUpPageComponent {}
