import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as Inputmask from 'inputmask';
import { NgControl } from '@angular/forms';
import { DateTimePickerDirective } from './date-time-picker.directive';

@Directive({
    selector: '[appDateTimeMask]'
})
export class DateTimeMaskDirective implements OnInit {

    @Input()
    dateTimeMaskSeconds: boolean;

    constructor(private elementRef: ElementRef,
                private control: NgControl) {
    }

    ngOnInit(): void {
        let pattern = '999/99/99 99:99';
        // has date-time-picker
        if (this.control.valueAccessor instanceof DateTimePickerDirective) {
            const accessor: DateTimePickerDirective = this.control.valueAccessor as DateTimePickerDirective;
            if (accessor.seconds) {
                pattern = '999/99/99 99:99:99';
            }
        } else {
            if (this.dateTimeMaskSeconds) {
                pattern = '999/99/99 99:99:99';
            }
        }
        Inputmask(pattern, {insertMode: false})
            .mask(this.elementRef.nativeElement);
    }

}
