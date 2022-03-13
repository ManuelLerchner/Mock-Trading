import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyItemComponent } from './currency-item.component';

describe('CurrencyComponent', () => {
  let component: CurrencyItemComponent;
  let fixture: ComponentFixture<CurrencyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
