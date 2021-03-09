import { YearMonthAdMaskDirective } from './date-str-input/ad/year-month-ad-mask.directive';
import { AdDateTimePipe } from './pipe/ad-datetime.pipe';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgModule, Injector } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ChartsModule } from 'ng2-charts';
import {
  NgbModule,
  NgbDatepickerI18n,
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DateErrorsComponent } from './date/ngb-date/date-errors.component';

import { DateTimePickerComponent } from './date/ngb-date/date-time-picker.component';
import { DateTimePickerDirective } from './date/ngb-date/date-time-picker.directive';
import { DateTimeErrorsComponent } from './date/ngb-date/date-time-errors.component';
import { DateIntervalSelectComponent } from './date/ngb-date/date-interval-select.component';
import { DateMaskDirective } from './date-str-input/minguo/date-mask.directive';
import { DateRangeErrorsComponent } from './date/ngb-date/date-range-errors.component';
import { DateTimeMaskDirective } from './date/ngb-date/date-time-mask.directive';
import { MinguoDateTimePipe } from './date/pipe/minguo-date-time.pipe';
import { MinguoDatePipe } from './date/pipe/minguo-date.pipe';
import { I18n, CustomDatepickerI18n } from './date/ngb-date/datepicker-i18n';
import { NgbCalendarMinguo } from './date/ngb-date/ngb-calendar-minguo';
import { NgbDateMomentAdapter } from './date/ngb-date/datepicker-adapter';
import { NgbDateCustomParserFormatter } from './date/ngb-date/ngb-date-custom-parser-formatter';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { InputComponent } from './input/input.component';
import { TimeRangedInputComponent } from './time-ranged-input/time-ranged-input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DateInputComponent } from './date-str-input/minguo/date-input.component';
import { DateParsingHttpInterceptor } from './date/ngb-date/date-parsing.interceptor';
import { notificationInterceptorProviders } from './interceptor/notification.interceptor';
import { uiLoaderInterceptorProviders } from './interceptor/ui-loader-interceptor';
import { FeeTypePipe } from './pipe/fee-type.pipe';
import { HasPaidPipe } from './pipe/has-paid.pipe';
import { MinguoPipe } from './pipe/minguo.pipe';
import { PayPathPipe } from './pipe/pay-path.pipe';
import { CustomCurrencyPipePipe } from './pipe/custom-currency-pipe.pipe';
import { AutoApi1Pipe } from './pipe/auto-api1.pipe';
import { AmiTimeSlotCode } from './pipe/ami-time-slot-code.pipe';
import { DateAdMaskDirective } from './date-str-input/ad/date-ad-mask.directive';
import { DateAdInputComponent } from './date-str-input/ad/date-ad-input.component';
import { YearMonthAdInputComponent } from './date-str-input/ad/year-month-ad-input.component';
import { BlackoutStatusPipe } from './pipe/blackout-status.pipe';
import { YearMonthInputComponent } from './date-str-input/minguo/year-month-input.component';
import { YearMonthMaskDirective } from './date-str-input/minguo/year-month-mask.directive';

@NgModule({
  declarations: [
    DateTimePickerComponent,
    DateTimePickerDirective,
    DateTimeErrorsComponent,
    DateIntervalSelectComponent,
    DateMaskDirective,
    DateAdMaskDirective,
    YearMonthAdMaskDirective,
    YearMonthMaskDirective,
    DateErrorsComponent,
    DateRangeErrorsComponent,
    DateTimeMaskDirective,
    MinguoDateTimePipe,
    MinguoDatePipe,
    InputComponent,
    TimeRangedInputComponent,
    SelectInputComponent,
    DataTableComponent,
    DateInputComponent,
    DateAdInputComponent,
    YearMonthAdInputComponent,
    YearMonthInputComponent,
    FeeTypePipe,
    HasPaidPipe,
    MinguoPipe,
    PayPathPipe,
    CustomCurrencyPipePipe,
    AutoApi1Pipe,
    AdDateTimePipe,
    BlackoutStatusPipe,
    AmiTimeSlotCode
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    NgbModule,
    FontAwesomeModule,
    NgxErrorsModule,
    AngularMultiSelectModule,
    NgxDatatableModule,
    JwBootstrapSwitchNg2Module,
    ToastrModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    NgbModule,
    FontAwesomeModule,
    ToastrModule,
    NgxDatatableModule,
    JwBootstrapSwitchNg2Module,
    DateTimePickerComponent,
    DateTimePickerDirective,
    DateTimeErrorsComponent,
    DateIntervalSelectComponent,
    DateMaskDirective,
    DateAdMaskDirective,
    YearMonthAdMaskDirective,
    YearMonthMaskDirective,
    DateErrorsComponent,
    DateRangeErrorsComponent,
    DateTimeMaskDirective,
    InputComponent,
    TimeRangedInputComponent,
    SelectInputComponent,
    DataTableComponent,
    DateInputComponent,
    YearMonthAdInputComponent,
    YearMonthInputComponent,
    DateAdInputComponent,
    MinguoDateTimePipe,
    MinguoDatePipe,
    FeeTypePipe,
    HasPaidPipe,
    MinguoPipe,
    PayPathPipe,
    CustomCurrencyPipePipe,
    AutoApi1Pipe,
    AdDateTimePipe,
    BlackoutStatusPipe,
    AmiTimeSlotCode
  ],
  entryComponents: [DateTimePickerComponent],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        I18n,
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
        { provide: NgbCalendar, useClass: NgbCalendarMinguo },
        { provide: NgbDateAdapter, useClass: NgbDateMomentAdapter },
        {
          provide: NgbDateParserFormatter,
          useClass: NgbDateCustomParserFormatter,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DateParsingHttpInterceptor,
          multi: true,
          deps: [Injector],
        },
        notificationInterceptorProviders,
        uiLoaderInterceptorProviders,
        MinguoDatePipe,
        MinguoDateTimePipe,
        FeeTypePipe,
        HasPaidPipe,
        MinguoPipe,
        PayPathPipe,
        AutoApi1Pipe,
        AdDateTimePipe,
        BlackoutStatusPipe,
        DecimalPipe, // for CustomCurrencyPipePipe use
        CustomCurrencyPipePipe
      ],
    };
  }
}
