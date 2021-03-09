import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adDateTime',
})
export class AdDateTimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // 20201021000000
    if (value) {
      if (value.length === 14) {
        return (
          value.substring(0, 4) +
          '/' +
          value.substring(4, 6) +
          '/' +
          value.substring(6, 8) +
          ' ' +
          value.substring(8, 10) +
          ':' +
          value.substring(10, 12) +
          ':' +
          value.substring(12, 14)
        );
      }
    }
    return '';
  }
}
