import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autoApi1',
})
export class AutoApi1Pipe implements PipeTransform {
  map = new Map([
    ['2', 'token錯誤 (code: 2)'],
    ['1', '系統維護中 (code: 1)'],
    ['0', '有未繳電費可預繳及中間抄表 (code: 0)'],
    ['-1', '有未繳電費可預繳不可中間抄表 (code: -1)'],
    ['-2', '無未繳電費可預繳及中間抄表 (code: -2)'],
    ['-3', '無未繳電費可預繳不可中間抄表 (code: -3)'],
    ['-4', '無此電號 (code: -4)'],
    ['-5', '該電號已終契 (code: -5)'],
    ['-6', '該電號送扣中 (code: -6)'],
    ['-7', '該電號不提供自助繳費功能 (code: -7)'],
  ]);
  transform(value: any, ...args: any[]): any {
    const result = this.map.get(value);
    return result ? result : '';
  }
}
