import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradePageComponent } from './trade-page.component';

describe('TradePageComponent', () => {
  let component: TradePageComponent;
  let fixture: ComponentFixture<TradePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
