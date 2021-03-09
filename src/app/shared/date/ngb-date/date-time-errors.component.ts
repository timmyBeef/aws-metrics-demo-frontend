import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-date-time-errors',
    templateUrl: './date-time-errors.component.html',
    styleUrls: ['./date-time-errors.component.css']
})
export class DateTimeErrorsComponent implements OnInit {

    @Input()
    controlName: string;

    constructor() {
    }

    ngOnInit() {
    }

}
