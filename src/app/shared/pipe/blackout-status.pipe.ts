import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blackoutStatus',
})
export class BlackoutStatusPipe implements PipeTransform {
  map = new Map([
    ['N', '未受理'],
    ['A', '已受理，尚未派工'],
    ['P', '已受理，搶修中'],
    ['D', '已搶修完成']
  ]);

  transform(value: any, ...args: any[]): any {
    const result = this.map.get(value);
    return result ? result : '';
  }
}
