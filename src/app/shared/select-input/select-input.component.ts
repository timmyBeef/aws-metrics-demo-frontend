import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent implements OnInit, AfterViewInit {
  @Input() label: string;
  @Input() data: any;
  @Input() control: FormControl;
  @Input() selectedItems: any;
  dropdownSettings: {};

  constructor() { }


  ngOnInit() {

    this.dropdownSettings = {
      singleSelection: true,
      text: '請選擇',
      enableSearchFilter: false,
      enableCheckAll: false,
      classes: '',
      lazyLoading: true,
    };
  }

  ngAfterViewInit() {
    
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
