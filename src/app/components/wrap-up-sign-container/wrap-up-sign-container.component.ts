import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wrap-up-sign-container',
  standalone: true,
  imports: [],
  templateUrl: './wrap-up-sign-container.component.html',
  styleUrl: './wrap-up-sign-container.component.css',
})
export class WrapUpSignContainerComponent {
  @Input() signee: string = '';
  @Input() signeeName: string = '';
  @Input() signeePassNumber: string = '';
}
