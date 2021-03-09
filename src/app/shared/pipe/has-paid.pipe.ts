import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasPaid',
})
export class HasPaidPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 'C':
        return '已繳';
      case 'A':
        return '未繳';
      case 'X':
        return '不顯示';
      default:
        return '';
    }
  }
}
