import { Directive, ElementRef, OnInit } from '@angular/core';
import * as Inputmask from 'inputmask';

@Directive({
    selector: '[appYearMonthAdMask]'
})
export class YearMonthAdMaskDirective implements OnInit {

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        Inputmask('9999/99', {insertMode: false})
            .mask(this.elementRef.nativeElement);
    }

}
