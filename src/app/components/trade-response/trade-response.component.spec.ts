import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeResponseComponent } from './trade-response.component';

describe('TradeResponseComponent', () => {
  let component: TradeResponseComponent;
  let fixture: ComponentFixture<TradeResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
