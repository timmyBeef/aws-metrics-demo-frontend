import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payPath',
})
export class PayPathPipe implements PipeTransform {
  map = new Map([
    ['T', '信用卡'],
    ['B', '條碼'],
  ]);

  transform(value: any, ...args: any[]): any {
    const result = this.map.get(value);
    return result ? result : '';
  }
}
