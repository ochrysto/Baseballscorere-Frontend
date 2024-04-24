import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallparkComponent } from './ballpark.component';

describe('BallparkComponent', () => {
  let component: BallparkComponent;
  let fixture: ComponentFixture<BallparkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BallparkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BallparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
