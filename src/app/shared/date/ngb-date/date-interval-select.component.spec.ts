import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateIntervalSelectComponent } from './date-interval-select.component';

describe('DateIntervalSelectComponent', () => {
    let component: DateIntervalSelectComponent;
    let fixture: ComponentFixture<DateIntervalSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DateIntervalSelectComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DateIntervalSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
