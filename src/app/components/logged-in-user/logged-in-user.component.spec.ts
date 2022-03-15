import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInComponentComponent } from './logged-in-component.component';

describe('LoggedInComponentComponent', () => {
  let component: LoggedInComponentComponent;
  let fixture: ComponentFixture<LoggedInComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedInComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
