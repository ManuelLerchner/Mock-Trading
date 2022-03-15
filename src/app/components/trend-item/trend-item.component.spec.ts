import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendItemComponent } from './trend-item.component';

describe('TrendItemComponent', () => {
  let component: TrendItemComponent;
  let fixture: ComponentFixture<TrendItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
