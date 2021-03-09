import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feeType',
})
export class FeeTypePipe implements PipeTransform {
  map = new Map([
    ['1', '電費'],
    ['F', '接電費'],
    ['C', '供電設備維持費'],
    ['P', '供電線路遷移工料費'],
    ['J', '線路設置費'],
    ['B', '預繳電費'],
    ['I', '遲付費用'],
    ['G', '保證金'],
    ['E', '複驗費'],
    ['G', '保證金'],
    ['K', '其他費用'],
  ]);

  transform(value: any, ...args: any[]): any {
    const result = this.map.get(value);
    return result ? result : '';
  }
}
