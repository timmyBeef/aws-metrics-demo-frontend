import { Component, ElementRef, forwardRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { NgbDatepickerConfig, NgbDateStruct, NgbTimepicker, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { take } from 'rxjs/operators';

const DATE_TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateTimePickerComponent),
    multi: true,
};

@Component({
    selector: 'app-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    styleUrls: ['./date-time-picker.component.css'],
    providers: [DATE_TIME_PICKER_VALUE_ACCESSOR],
})
export class DateTimePickerComponent implements OnInit, ControlValueAccessor {
    @Input()
    startDate: { year: number; month: number };

    @Input()
    minDate: NgbDateStruct;

    @Input()
    maxDate: NgbDateStruct;

    @Input()
    seconds: boolean;

    @Input()
    spinners = true;

    @Input()
    disabled = false;

    datetime: moment.Moment;

    date: moment.Moment;

    time: NgbTimeStruct;

    @ViewChild(NgbTimepicker, {static: true})
    private timePicker: NgbTimepicker;

    public subject = new Subject();

    onChange = (value: moment.Moment) => {};
    onTouched = () => {};

    constructor(private ngZone: NgZone,
                private elementRef: ElementRef<HTMLElement>,
                private datePickerConfig: NgbDatepickerConfig) {
    }

    ngOnInit() {
        if (!this.datetime) {
            this.datetime = moment();
        } else {
            this.date = this.datetime;
        }
        const second: number = this.seconds ? this.datetime.second() : 0;
        this.time = {
            hour: this.datetime.hour(),
            minute: this.datetime.minute(),
            second: second,
        };
        this.startDate = {
            year: this.datetime.year() - 1911,
            month: this.datetime.month() + 1,
        };
        this.timePicker.setDisabledState(this.disabled);

        if (!this.maxDate) {
            this.maxDate = this.datePickerConfig.maxDate;
        }

        if (!this.minDate) {
            this.minDate = this.datePickerConfig.minDate;
        }

    }

    setDisabledState(isDisabled: boolean): void {
        this.timePicker.setDisabledState(isDisabled);
        this.disabled = isDisabled;
    }

    updateDate() {
        this.updateDateTime();
    }

    updateTime() {
        this.updateDateTime();
    }

    updateDateTime() {
        if (this.date) {
            const clone: moment.Moment = Object.assign(this.date);
            if (this.time) {
                if (!isNullOrUndefined(this.time.hour)) {
                    clone.hour(this.time.hour);
                }
                if (!isNullOrUndefined(this.time.minute)) {
                    clone.minute(this.time.minute);
                }
                if (this.seconds) {
                    if (!isNullOrUndefined(this.time.second)) {
                        clone.second(this.time.second);
                    }
                } else {
                    clone.second(0);
                }
            }
            this.datetime = clone;
            this.onChange(this.datetime);
        }
    }

    close() {
        this.subject.next({
            name: 'close',
            datetime: this.datetime,
        });
    }

    focus() {
        this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
            const elementToFocus =
                this.elementRef.nativeElement.querySelector<HTMLDivElement>('div.ngb-dp-day[tabindex="0"]');
            if (elementToFocus) {
                elementToFocus.focus();
            }
        });
    }


    writeValue(value: moment.Moment): void {
        let clone: moment.Moment = Object.assign(value);
        if (!clone) {
            clone = moment();
        }
        const second: number = this.seconds ? clone.second() : 0;
        this.date = clone;
        this.time = {
            hour: value.hour(),
            minute: value.minute(),
            second: second,
        };
    }

    registerOnChange(fn: (value: moment.Moment) => any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }
}

export interface DateTimePickerEvent {
    name: string;
    datetime: moment.Moment;
}
