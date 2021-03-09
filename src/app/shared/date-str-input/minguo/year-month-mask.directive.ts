import { Directive, ElementRef, OnInit } from '@angular/core';
import * as Inputmask from 'inputmask';

@Directive({
    selector: '[appYearMonthMask]'
})
export class YearMonthMaskDirective implements OnInit {

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        Inputmask('999/99', {insertMode: false})
            .mask(this.elementRef.nativeElement);
    }

}
