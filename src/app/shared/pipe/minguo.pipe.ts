import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minguo',
})
export class MinguoPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value) {
      if (value.length === 5) {
        return value.substring(0, 3) + '/' + value.substring(3, 5);
      } else if (value.length === 7) {
        return (
          value.substring(0, 3) +
          '/' +
          value.substring(3, 5) +
          '/' +
          value.substring(5, 7)
        );
      }
    }
    return '';
  }
}
