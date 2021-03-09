import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeErrorsComponent } from './date-time-errors.component';

describe('DateTimeErrorsComponent', () => {
    let component: DateTimeErrorsComponent;
    let fixture: ComponentFixture<DateTimeErrorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DateTimeErrorsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DateTimeErrorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
