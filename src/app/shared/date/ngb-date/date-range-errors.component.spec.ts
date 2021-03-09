import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeErrorsComponent } from './date-range-errors.component';

describe('DateRangeErrorsComponent', () => {
  let component: DateRangeErrorsComponent;
  let fixture: ComponentFixture<DateRangeErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRangeErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
