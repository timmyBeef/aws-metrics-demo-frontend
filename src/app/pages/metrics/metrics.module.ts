import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetricsRoutingModule } from './metrics-routing.module';
import { QueryComponent } from './query/query.component';


@NgModule({
  declarations: [QueryComponent],
  imports: [
    CommonModule,
    MetricsRoutingModule
  ]
})
export class MetricsModule { }
