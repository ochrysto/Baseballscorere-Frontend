import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapUpSignContainerComponent } from './wrap-up-sign-container.component';

describe('WrapUpSignContainerComponent', () => {
  let component: WrapUpSignContainerComponent;
  let fixture: ComponentFixture<WrapUpSignContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrapUpSignContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WrapUpSignContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
