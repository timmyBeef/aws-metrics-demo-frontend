import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  constructor(private http: HttpClient) {}

  fetch(request: string) {
    return this.http.post<QueryResponse[]>('/cloudwatch/fetch', {
      namespace: request,
    });
  }
}
