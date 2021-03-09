import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataTableColumn } from '../data-table-column';
import { gridRowSize } from './settings';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() label: string;
  // tslint:disable-next-line:no-input-rename
  @Input('data') rows: any[];
  // tslint:disable-next-line:no-input-rename
  @Input('itemNames') columns: DataTableColumn[];
  // tslint:disable-next-line:no-input-rename
  @Input('detailItemNames') details: any[];
  // tslint:disable-next-line:no-input-rename
  @Input('detailsLabel') detailsLabel = '詳細資料';
  @Input() showDetailBtn: boolean;
  @Input() showAppMemberSetting: boolean;

  @Output() selectDataEvent = new EventEmitter();

  test: any = `<button (click)="onSelect($event)">Click me</button>`;
  entries = gridRowSize;
  selected: any[] = [];
  temp = [];
  activeRow: any;

  modalValue: any;

  // modal
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  ngOnChanges() {

    if (this.rows) {
      this.temp = this.rows.map((prop, key) => {
        return {
          ...prop,
          id: key,
        };
      });
      console.log('temp data:', this.temp);
    }
  }

  ngOnInit() {}

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    const val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      console.log(d);

      for (const key in d) {
        if (d[key] && d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  onSelect($event) {
    console.log('Select Event', $event);
  }
  onActivate(event) {
    // this.activeRow = event.row;
    if (event.type === 'click') {
      console.log('click send data:', event);

      this.activeRow = event.row;
      this.selectDataEvent.emit(this.activeRow);
    }
  }

  // modal
  open(content) {
    console.log(content);
    this.getModalValue();
    const activeModal = this.modalService.open(content, { size: 'lg' });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getModalValue() {
    console.log(this.activeRow);

    this.details.map((data) => {
      console.log('data table:', data);
      data.value = this.activeRow[data.prop];
    });
  }
}
