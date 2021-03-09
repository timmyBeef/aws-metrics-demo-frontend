import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

// tslint:disable-next-line: use-pipe-transform-interface
@Pipe({
  name: 'customCurrencyPipe',
})
export class CustomCurrencyPipePipe {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(val: string, ...args: any[]) {
    const format = '1.';
    return this.decimalPipe.transform(val, format);
  }
}

// export class CustomCurrencyPipePipe extends DecimalPipe
//   implements PipeTransform {

//   transform(value: any, ...args: any[]): any {
//     return super.transform(value, '1.');
//   }
// }
