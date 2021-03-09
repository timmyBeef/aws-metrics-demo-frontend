import { Directive, ElementRef, OnInit } from '@angular/core';
import * as Inputmask from 'inputmask';

@Directive({
    selector: '[appDateAdMask]'
})
export class DateAdMaskDirective implements OnInit {

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        Inputmask('9999/99/99', {insertMode: false})
            .mask(this.elementRef.nativeElement);
    }

}
