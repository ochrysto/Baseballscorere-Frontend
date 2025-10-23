import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapUpScoresheetTabsComponent } from './wrap-up-scoresheet-tabs.component';

describe('WrapUpScoresheetTabsComponent', () => {
  let component: WrapUpScoresheetTabsComponent;
  let fixture: ComponentFixture<WrapUpScoresheetTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrapUpScoresheetTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WrapUpScoresheetTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
