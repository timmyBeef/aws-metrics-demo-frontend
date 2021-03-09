import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRangedInputComponent } from './time-ranged-input.component';

describe('TimeRangedInputComponent', () => {
  let component: TimeRangedInputComponent;
  let fixture: ComponentFixture<TimeRangedInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeRangedInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
