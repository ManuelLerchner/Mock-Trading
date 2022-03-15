import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareItemComponent } from './share-item.component';

describe('ShareItemComponent', () => {
  let component: ShareItemComponent;
  let fixture: ComponentFixture<ShareItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
