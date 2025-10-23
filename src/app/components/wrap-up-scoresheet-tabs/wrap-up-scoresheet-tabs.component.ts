import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-wrap-up-scoresheet-tabs',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './wrap-up-scoresheet-tabs.component.html',
  styleUrl: './wrap-up-scoresheet-tabs.component.css',
})
export class WrapUpScoresheetTabsComponent {
  @Input() img: string = '';
  @Input() team: string = '';
}
