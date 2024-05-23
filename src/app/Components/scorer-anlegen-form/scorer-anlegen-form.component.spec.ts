import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorerAnlegenFormComponent } from './scorer-anlegen-form.component';

describe('ScorerAnlegenFormComponent', () => {
  let component: ScorerAnlegenFormComponent;
  let fixture: ComponentFixture<ScorerAnlegenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScorerAnlegenFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScorerAnlegenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
