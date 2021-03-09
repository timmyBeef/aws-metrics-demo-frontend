import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amiTimeSlotCode',
})
export class AmiTimeSlotCode implements PipeTransform {
  // 離峰1 / 半尖峰2 / 週六半尖峰3 / 尖峰4
  map = new Map([
    [1, '離峰'],
    [2, '半尖峰'],
    [3, '週六半尖峰'],
    [4, '尖峰']
  ]);
  transform(value: any, ...args: any[]): any {
    const result = this.map.get(value);
    return result ? result : '';
  }
}
