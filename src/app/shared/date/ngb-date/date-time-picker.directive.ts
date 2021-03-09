import {
    ChangeDetectorRef,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewContainerRef,
} from '@angular/core';
import { DateTimePickerComponent, DateTimePickerEvent } from './date-time-picker.component';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import * as moment from 'moment';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
import { ngbAutoClose, ngbFocusTrap } from '../../ngb-utils';

const DATE_TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateTimePickerDirective),
    multi: true,
};

const DATE_TIME_PICKER_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DateTimePickerDirective),
    multi: true
};

@Directive({
    selector: 'input[appDateTimePicker]',
    exportAs: 'appDateTimePicker',
    providers: [DATE_TIME_PICKER_VALUE_ACCESSOR, DATE_TIME_PICKER_VALIDATOR],
})
export class DateTimePickerDirective
    implements OnInit, OnDestroy, ControlValueAccessor, Validator {
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

    _disabled = false;

    private componentRef: ComponentRef<DateTimePickerComponent> = null;

    private inputValue: string;

    private eventSubscriber;

    private model: moment.Moment;

    @Output()
    closed = new EventEmitter<void>();

    onChange = (value: any) => {};

    onTouched = () => {};

    validatorChange = () => {};


    constructor(
        private element: ElementRef<HTMLInputElement>,
        private viewContainer: ViewContainerRef,
        private renderer: Renderer2,
        private componentFactoryResolver: ComponentFactoryResolver,
        private ngZone: NgZone,
        private changeDetector: ChangeDetectorRef,
        private parserFormatter: NgbDateParserFormatter,
        private calendar: NgbCalendar,
        private datePickerConfig: NgbDatepickerConfig,
        @Inject(DOCUMENT) private document: any,
    ) {}

    @Input()
    @HostBinding('disabled')
    get disabled() {
        return this._disabled;
    }
    set disabled(value: any) {
        this._disabled = value === '' || (value && value !== 'false');
        if (this.isOpen()) {
            this.componentRef.instance.setDisabledState(this.disabled);
        }
    }

    ngOnInit() {}

    ngOnDestroy() {
        if (this.eventSubscriber) {
            this.eventSubscriber.unsubscribe();
        }
    }

    @HostListener('input', ['$event'])
    onInput($event) {
        this.manualDateChange($event.target.value);
    }

    @HostListener('change', ['$event'])
    onInputChange($event) {
        this.manualDateChange($event.target.value, true);
    }

    @HostListener('blur')
    onInputBlur() {
        this.onTouched();
    }

    isOpen() {
        return !!this.componentRef;
    }

    toggle() {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    close() {
        if (this.isOpen()) {
            this.viewContainer.remove(
                this.viewContainer.indexOf(this.componentRef.hostView)
            );
            this.componentRef = null;
            this.closed.emit();
            this.onTouched();
            this.changeDetector.markForCheck();
        }
    }

    open() {
        if (!this.isOpen()) {
            const ref = this.componentFactoryResolver.resolveComponentFactory(
                DateTimePickerComponent
            );
            this.componentRef = this.viewContainer.createComponent(ref);
            this.applyPopupStyling(this.componentRef.location.nativeElement);
            this.applyDatepickerInputs(this.componentRef.instance);
            if (this.model) {
                this.componentRef.instance.datetime = this.model;
            }
            // date selection event handling
            this.componentRef.instance.registerOnChange(selectedDate => {
                this.writeValue(selectedDate);
                this.onChange(selectedDate);
            });

            this.componentRef.instance.setDisabledState(this.disabled);

            this.componentRef.changeDetectorRef.detectChanges();
            this.eventSubscriber = this.componentRef.instance.subject.subscribe(
                (event: DateTimePickerEvent) => {
                    if (event.name === 'close') {
                        this.model = event.datetime;
                        this.onChange(this.model);
                        this.close();
                    }
                }
            );

            ngbFocusTrap(this.componentRef.location.nativeElement, this.closed, true);
            this.componentRef.instance.focus();

            ngbAutoClose(
                this.ngZone, this.document, true, () => this.close(), this.closed, [],
                [this.element.nativeElement, this.componentRef.location.nativeElement]);
        }
    }

    registerOnChange(fn: (value: any) => any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    registerOnValidatorChange(fn: () => void): void {
        this.validatorChange = fn;
    }

    writeValue(value: moment.Moment) {
        if (value) {
            if (this.isOpen()) {
                this.componentRef.instance.writeValue(value);
            }
        }
        this.model = value;
        this.writeModelValue(value);
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (control.value) {
            if (!moment.isMoment(control.value)) {
                return {'dateTime': {invalid: control.value}};
            }
            const maxDate = this.maxDate || this.datePickerConfig.maxDate;
            const minDate = this.minDate || this.datePickerConfig.minDate;
            const model: moment.Moment = control.value as moment.Moment;


            if (maxDate) {
                const maxMoment = moment([maxDate.year + 1911, maxDate.month - 1, maxDate.day]).endOf('day');
                if (model.isAfter(maxMoment)) {
                    return {'dateTime': {requiredAfter: maxDate}};
                }
            }

            if (minDate) {
                const minMoment = moment([minDate.year + 1911, minDate.month - 1, minDate.day]).startOf('day');
                if (model.isBefore(minMoment)) {
                    return {'dateTime': {requiredBefore: minDate}};
                }
            }

        }
        return null;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    manualDateChange(value: string, updateView = false) {
        if (value) {
            const inputValueChanged = value !== this.inputValue;
            if (inputValueChanged) {
                this.inputValue = value;
                this.model = this.parseMingouDate(value);
            }
            if (inputValueChanged || !updateView) {
                this.onChange(
                    this.model ? this.model : value === '' ? null : value
                );
            }
            if (updateView && this.model) {
                this.writeModelValue(this.model);
            }
        } else {
            this.inputValue = null;
            this.model = null;
            this.onChange(this.model);
        }
    }

    private parseMingouDate(value: string) {
        const length = this.seconds ? 18 : 15;
        if (value.length === length) {
            const date: string = value.substring(0, 9);
            const dateStruct: NgbDateStruct = this.parserFormatter.parse(date);
            if (dateStruct) {
                const isDateValid = this.calendar.isValid(NgbDate.from(dateStruct));
                if (isDateValid) {
                    const year = Number(value.substring(0, value.indexOf('/'))) + 1911;
                    const m = moment(year + value.substring(value.indexOf('/')), 'YYYY/MM/DD HH:mm:ss');
                    if (m.isValid()) {
                        return m;
                    }
                }
            }
        }
        return null;
    }



    private applyDatepickerInputs(
        datepickerInstance: DateTimePickerComponent
    ): void {
        [
            'dayTemplate',
            'displayMonths',
            'firstDayOfWeek',
            'markDisabled',
            'minDate',
            'maxDate',
            'navigation',
            'outsideDays',
            'showNavigation',
            'showWeekdays',
            'showWeekNumbers',
            'seconds',
            'spinners',
            'markDisabled',
        ].forEach((optionName: string) => {
            if (this[optionName] !== undefined) {
                datepickerInstance[optionName] = this[optionName];
            }
        });
        // datepickerInstance.startDate = this.startDate || this.model;
    }

    private writeModelValue(value: moment.Moment) {
        if (value) {
            const minguoYear = value.year() - 1911;
            const format = this.seconds ? '/MM/DD HH:mm:ss' : '/MM/DD HH:mm';
            const formattedValue = minguoYear.toString().padStart(3, '0') + value.format(format);
            this.inputValue = formattedValue;
            this.renderer.setProperty(
                this.element.nativeElement,
                'value',
                formattedValue
            );
            if (this.isOpen()) {
                this.componentRef.instance.writeValue(value);
            }
        } else {
            this.renderer.setProperty(this.element.nativeElement, 'value', '');
        }
        this.onTouched();
        this.onChange(value);
    }

    private applyPopupStyling(nativeElement: any) {
        this.renderer.addClass(nativeElement, 'dropdown-menu');
        this.renderer.setStyle(nativeElement, 'padding', '0');
        this.renderer.addClass(nativeElement, 'show');
    }
}
