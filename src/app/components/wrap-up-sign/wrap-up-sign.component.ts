import { Component, OnInit } from '@angular/core';
import { WrapUpSignContainerComponent } from '../wrap-up-sign-container/wrap-up-sign-container.component';
import { ButtonComponent } from '../buttons/button/button.component';
import { WrapUpService } from '../../services/wrap-up.service';
import { AsyncPipe } from '@angular/common';
import { WrapUpGeneralData } from '../../models/wrap-up-general-data';

@Component({
  selector: 'app-wrap-up-sign',
  standalone: true,
  imports: [WrapUpSignContainerComponent, ButtonComponent, AsyncPipe],
  templateUrl: './wrap-up-sign.component.html',
  styleUrl: './wrap-up-sign.component.css',
})
export class WrapUpSignComponent implements OnInit {
  generalData: WrapUpGeneralData | null = null;
  constructor(private service: WrapUpService) {}
  ngOnInit(): void {
    this.service.getGeneralData().subscribe((data) => {
      this.generalData = data;
    });
  }
}
