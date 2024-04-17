import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseballScorerHomeComponent } from './baseball-scorer-home.component';

describe('BaseballScorerHomeComponent', () => {
  let component: BaseballScorerHomeComponent;
  let fixture: ComponentFixture<BaseballScorerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseballScorerHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseballScorerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
