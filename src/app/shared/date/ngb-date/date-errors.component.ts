import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-date-errors',
    templateUrl: './date-errors.component.html',
    styleUrls: ['./date-errors.component.css']
})
export class DateErrorsComponent implements OnInit {

    @Input()
    controlName: string;

    constructor() {
    }

    ngOnInit() {
    }

}
