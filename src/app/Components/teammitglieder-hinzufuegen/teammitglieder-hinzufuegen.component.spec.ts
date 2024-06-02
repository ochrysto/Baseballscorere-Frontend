import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammitgliederHinzufuegenComponent } from './teammitglieder-hinzufuegen.component';

describe('TeammitgliederHinzufuegenComponent', () => {
  let component: TeammitgliederHinzufuegenComponent;
  let fixture: ComponentFixture<TeammitgliederHinzufuegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeammitgliederHinzufuegenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeammitgliederHinzufuegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
