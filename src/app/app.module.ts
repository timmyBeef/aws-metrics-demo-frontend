import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { AppRoutes, AppRoutingModule } from './app.routing';
import { SharedModule } from './shared';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  POSITION,
  SPINNER,
  PB_DIRECTION,
  NgxUiLoaderHttpModule,
} from 'ngx-ui-loader';
import { DecimalPipe } from '@angular/common';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  // bgsColor: 'red',  // bgs 沒用到
  // bgsPosition: POSITION.bottomCenter,
  // bgsSize: 40,
  // bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.chasingDots, // foreground spinner type
  fgsSize: 80,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }), // import NgxUiLoaderHttpModule. By default, it will show background loader.
    ComponentsModule,
    AppRoutingModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
