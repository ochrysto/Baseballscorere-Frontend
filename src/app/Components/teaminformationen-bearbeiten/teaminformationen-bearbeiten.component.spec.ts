import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaminformationenBearbeitenComponent } from './teaminformationen-bearbeiten.component';

describe('TeaminformationenBearbeitenComponent', () => {
  let component: TeaminformationenBearbeitenComponent;
  let fixture: ComponentFixture<TeaminformationenBearbeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeaminformationenBearbeitenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeaminformationenBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
