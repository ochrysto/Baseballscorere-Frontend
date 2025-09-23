import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapUpPageComponent } from './wrap-up-page.component';

describe('WrapUpPageComponent', () => {
  let component: WrapUpPageComponent;
  let fixture: ComponentFixture<WrapUpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrapUpPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WrapUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
