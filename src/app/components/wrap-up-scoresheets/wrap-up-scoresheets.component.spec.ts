import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapUpScoresheetsComponent } from './wrap-up-scoresheets.component';

describe('WrapUpScoresheetsComponent', () => {
  let component: WrapUpScoresheetsComponent;
  let fixture: ComponentFixture<WrapUpScoresheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrapUpScoresheetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WrapUpScoresheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
