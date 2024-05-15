import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLineUpComponent } from './game-line-up.component';

describe('GameLineUpComponent', () => {
  let component: GameLineUpComponent;
  let fixture: ComponentFixture<GameLineUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameLineUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameLineUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
