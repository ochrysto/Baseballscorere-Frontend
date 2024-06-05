import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamErstellungsFormComponent} from "./team-erstellungs-form.component";

describe('TeamErstellungsFormComponent', () => {
  let component: TeamErstellungsFormComponent;
  let fixture: ComponentFixture<TeamErstellungsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamErstellungsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamErstellungsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
