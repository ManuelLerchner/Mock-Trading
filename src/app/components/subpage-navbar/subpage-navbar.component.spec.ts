import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageNavbarComponent } from './subpage-navbar.component';

describe('SubpageNavbarComponent', () => {
  let component: SubpageNavbarComponent;
  let fixture: ComponentFixture<SubpageNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpageNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpageNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
