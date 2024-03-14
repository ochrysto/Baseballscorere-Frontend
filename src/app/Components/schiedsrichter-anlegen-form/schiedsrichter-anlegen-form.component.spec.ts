import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchiedsrichterAnlegenFormComponent } from './schiedsrichter-anlegen-form.component';

describe('SchiedsrichterAnlegenFormComponent', () => {
  let component: SchiedsrichterAnlegenFormComponent;
  let fixture: ComponentFixture<SchiedsrichterAnlegenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchiedsrichterAnlegenFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchiedsrichterAnlegenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
