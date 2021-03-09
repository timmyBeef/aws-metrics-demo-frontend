import { MetricsService } from './../metrics.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css'],
})
export class QueryComponent implements OnInit {
  data: QueryResponse[];
  constructor(private service: MetricsService, private s: SharedService) {}

  ngOnInit() {}

  query() {
    this.service.fetch('AWS/EC2').subscribe((response) => {
      this.data = response;
      this.s.info('查詢成功');
    });
  }
}
