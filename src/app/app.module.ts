import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { FullpageModule } from './layouts/fullpage/fullpage.module';
import { FullpageadminModule } from './layouts/fullpageadmin/fullpageadmin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AdminemptyModule } from './layouts/adminempty/adminempty.module';
import { JwtInterceptor } from './modules/common/interceptor/jwtinterceptor';
import { BaseUrlInterceptor } from './modules/common/interceptor/base-url.interceptor';
import { AdminAuthorizeGuard } from './modules/admin/common/guard/adminAuthorizeGuard';







@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    FullpageModule,
    FullpageadminModule,
    AdminemptyModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AdminAuthorizeGuard 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }