import { Component } from '@angular/core';
import { WrapUpSignContainerComponent } from '../wrap-up-sign-container/wrap-up-sign-container.component';
import { ButtonComponent } from '../buttons/button/button.component';

@Component({
  selector: 'app-wrap-up-sign',
  standalone: true,
  imports: [WrapUpSignContainerComponent, ButtonComponent],
  templateUrl: './wrap-up-sign.component.html',
  styleUrl: './wrap-up-sign.component.css',
})
export class WrapUpSignComponent {}
