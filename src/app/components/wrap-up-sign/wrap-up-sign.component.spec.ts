import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapUpSignComponent } from './wrap-up-sign.component';

describe('WrapUpSignComponent', () => {
  let component: WrapUpSignComponent;
  let fixture: ComponentFixture<WrapUpSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrapUpSignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WrapUpSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
