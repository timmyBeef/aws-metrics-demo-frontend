import { PipeTransform } from '@angular/core';

export interface DataTableColumn {
  prop: string;
  name: string;
  value?: string;
  width?: number;
  pipe?: PipeTransform;

}
