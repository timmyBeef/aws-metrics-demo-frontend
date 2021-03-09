import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateErrorsComponent } from './date-errors.component';

describe('DateErrorsComponent', () => {
    let component: DateErrorsComponent;
    let fixture: ComponentFixture<DateErrorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DateErrorsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DateErrorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
