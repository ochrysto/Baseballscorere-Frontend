import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielAnlegenComponent } from '../spiel-anlegen/spiel-anlegen.component';

describe('SpielAnlegenComponent', () => {
  let component: SpielAnlegenComponent;
  let fixture: ComponentFixture<SpielAnlegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielAnlegenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielAnlegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
