import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'metrics/query' },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'metrics',
        loadChildren: () =>
          import('./pages/metrics/metrics.module').then((m) => m.MetricsModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    [
      RouterModule.forRoot(AppRoutes, {
        useHash: false,
      }),
    ],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
