import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBaseComponent } from './on-base.component';

describe('OnBaseComponent', () => {
  let component: OnBaseComponent;
  let fixture: ComponentFixture<OnBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
